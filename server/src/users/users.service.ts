import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users.entity';
import { RegisterDto } from './dto/register.dto';
import { IUserRepository } from './repository/users.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, username, password } = registerDto;

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const user = { email, username, password };
    await this.usersRepository.createUser(user);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findByEmail(email);

    if (user && (await user.comparePassword(password))) {
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
