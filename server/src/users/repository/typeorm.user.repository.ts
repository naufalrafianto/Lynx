// typeorm.user.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../users.entity';
import { IUserRepository } from './users.repository.interface';

@EntityRepository(User)
@Injectable()
export class TypeOrmUserRepository
  extends Repository<User>
  implements IUserRepository
{
  async findById(id: string): Promise<User> {
    return this.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.create(user);
    return await this.save(newUser);
  }
}
