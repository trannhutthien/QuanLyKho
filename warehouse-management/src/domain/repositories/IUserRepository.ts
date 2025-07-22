import type { User, CreateUserRequest } from '../entities/User';

// Interface định nghĩa contract cho User repository operations
export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(userData: CreateUserRequest): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
}
