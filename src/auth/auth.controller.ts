import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_LOGIN } from 'src/app.events';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  @Post('user')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Session() session: Record<string, unknown>,
  ) {
    const login = await this.authService.login(email, password);
    if (
      !(login instanceof NotFoundException) &&
      !(login instanceof InternalServerErrorException) &&
      !(login instanceof UnauthorizedException)
    ) {
      this.eventEmitter.emit(USER_LOGIN, session, 'user', login);
    }
    return login;
  }
}
