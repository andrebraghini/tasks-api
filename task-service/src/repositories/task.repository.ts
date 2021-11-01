import { Knex } from 'knex';
import { parse, stringify } from 'uuid';
import { db } from '../db';
import { Task } from '../types/task';

function uuidParse(data: string | null | undefined): Buffer | any {
  return data ? Buffer.from(parse(data) as Uint8Array) : data;
}

export class TaskRepository {

  private table(): Knex.QueryBuilder {
    return db().table('tasks');
  }

  async getById(id: string): Promise<Task.Entity | null> {
    return this.table()
      .where({ id: uuidParse(id) })
      .first()
      .then(this.stringifyUuid.bind(this));
  }

  async listByUserId(userId: string): Promise<Task.Entity[]> {
    return this.table()
      .where({ user_id: uuidParse(userId) })
      .then(rows => rows.map(this.stringifyUuid.bind(this)));
  }

  async insert(task: Task.Entity): Promise<void> {
    const data = {
      ...task,
      id: uuidParse(task.id),
      user_id: uuidParse(task.user_id)
    };
    await this.table().insert(data);
  }
  
  async update(id: string, task: Partial<Omit<Task.Entity, 'id' | 'user_id'>>): Promise<void> {
    await this.table()
      .update(task)
      .where({ id: uuidParse(id) });
  }
  
  protected stringifyUuid(task?: any): Task.Entity | null {
    if (task) {
      return {
        ...task,
        id: stringify(task.id),
        user_id: stringify(task.user_id)
      };
    }

    return task;
  }

}