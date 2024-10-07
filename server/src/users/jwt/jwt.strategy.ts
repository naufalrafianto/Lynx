import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IUserRepository } from '../repository/users.repository.interface';
import { Inject } from '@nestjs/common';
import { User } from '../users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key',
    });
  }

  async validate(payload: any): Promise<User> {
    return await this.userRepository.findById(payload.sub);
  }
}
