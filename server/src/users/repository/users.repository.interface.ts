import { User } from '../users.entity';

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findByEmail(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  createUser(user: Partial<User>): Promise<User>;
  save(user: User): Promise<User>;
}
