import { UserInputError } from 'apollo-server-errors';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { env } from '../env';
import { Task } from '../types/task';

export class TaskService {
  protected instance: AxiosInstance;

  constructor() {
    const options: AxiosRequestConfig = {
      baseURL: env.TASK_SERVICE_URL
    };
    this.instance = axios.create(options);
  }

  get(id: string) {
    return this.instance.get(`/tasks/${id}`)
      .then(response => response.data)
      .catch(this.errorHandler.bind(this));
  }

  getUserTasks(userId: string) {
    return this.instance.get(`/tasks?user_id=${userId}`)
      .then(response => response.data.data)
      .catch(this.errorHandler.bind(this));
  }

  insert(task: Task.Entity) {
    return this.instance.post('/tasks', task)
      .then(response => response.data)
      .catch(this.errorHandler.bind(this));
  }

  update(id: string, task: Partial<Omit<Task.Entity, 'id' | 'user_id'>>) {
    return this.instance.patch(`/tasks/${id}`, task)
      .then(response => response.data)
      .catch(this.errorHandler.bind(this));
  }

  private errorHandler(error: AxiosError) {
    if (error.response?.status === 400) {
      throw new UserInputError(error.response.data?.error?.message, error.response.data?.error?.details);
    }
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}