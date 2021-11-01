import { Knex } from 'knex';
import { parse, stringify } from 'uuid';
import { db } from '../db';
import { User } from '../types/user';

function uuidParse(data: string | null | undefined): Buffer | any {
  return data ? Buffer.from(parse(data) as Uint8Array) : data;
}

export class UserRepository {

  private table(): Knex.QueryBuilder {
    return db().table('users');
  }

  async insert(user: User.Entity): Promise<void> {
    const data = {
      ...user,
      id: uuidParse(user.id)
    };
    await this.table().insert(data);
  }
  
  async getByUsername(username: string): Promise<User.Entity | null> {
    return this.table()
      .where({ username })
      .first()
      .then(this.stringifyUuid.bind(this));
  }

  protected stringifyUuid(user?: any): User.Entity | null {
    if (user) {
      return {
        ...user,
        id: stringify(user.id)
      };
    }

    return user;
  }

}