import { AuthenticationError, ValidationError } from 'apollo-server-errors';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { Task } from './types/task';
import { v4 as guid } from 'uuid';

const authService = new AuthService();
const taskService = new TaskService();

export const resolvers = {
  Query: {
    login: async (_, args: { username: string, password: string }) => {
      const { username, password } = args;
      const data = await authService.login(username, password);

      return data;
    },

    task: async (_, args: { id: string }, context) => {
      const { id } = args;
      const task = await taskService.get(id);

      const { user } = context;
      if (task && user?.id !== task.user_id) {
        throw new AuthenticationError('Access denied');
      }

      return task;
    },

    tasks: async (_, _args, context) => {
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('Access denied');
      }

      const tasks = await taskService.getUserTasks(user.id);

      return tasks;
    }
  },

  Mutation: {
    signUp: async (_, args: { username: string, password: string }) => {
      const { username, password } = args;
      const data = await authService.signUp(username, password);
      return true;
    },

    addTask: async (_, args: { title: string, description: string, status: Task.Status }, context) => {
      const { user } = context;
      if (!user) {
        throw new AuthenticationError('Access denied');
      }

      const id = guid();
      const user_id = user.id;
      const task = {
        ...args,
        id,
        user_id
      };
      await taskService.insert(task);
      return id;
    },

    updateTask: async (_, args: { id: string, title?: string, description?: string, status?: Task.Status }, context) => {
      const { id } = args;
      const task = await taskService.get(id);

      if (!task) {
        throw new ValidationError('Task not found');
      }

      const { user } = context;
      if (task && user?.id !== task.user_id) {
        throw new AuthenticationError('Access denied');
      }

      const newData = { ...args } as any;
      delete newData.id;

      await taskService.update(id, newData);
      
      Object.assign(task, newData);
      return task;
    }
  }
};
