import { LoginCommand } from '../../commands/auth/LoginCommand';
import { RegisterCommand } from '../../commands/auth/RegisterCommand';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import type { LoginRequest, CreateUserRequest, AuthResponse } from '../../../domain/entities/User';

// Service điều phối các auth commands và repositories
export class AuthService {
  private userRepository = new UserRepository();
  private loginCommand = new LoginCommand(this.userRepository);
  private registerCommand = new RegisterCommand(this.userRepository);

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    return await this.loginCommand.execute(loginData);
  }

  async register(registerData: CreateUserRequest): Promise<AuthResponse> {
    return await this.registerCommand.execute(registerData);
  }
}
