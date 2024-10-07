import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.usersService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.usersService.login(loginDto);
  }
}
