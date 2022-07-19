import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Redirect,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  USER_LOGIN,
  USER_LOGOUT,
} from 'src/app.events';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  @Post('user/login')
  @ApiBody({
    type: LoginUserDto,
    description: 'user credentials',
    required: true,
  })
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Session() session: Record<string, unknown>,
  ) {
    const login = await this.authService.login(email, password, 'users');
    if (
      !(login instanceof NotFoundException) &&
      !(login instanceof InternalServerErrorException) &&
      !(login instanceof UnauthorizedException)
    ) {
      this.eventEmitter.emit(USER_LOGIN, session, 'user', login);
    }
    return login;
  }

  @Post('admin/login')
  @ApiBody({
    type: LoginUserDto,
    description: 'user credentials',
    required: true,
  })
  async adminLogin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Session() session: Record<string, unknown>,
  ) {
    const login = await this.authService.login(email, password, 'admins');
    if (
      !(login instanceof NotFoundException) &&
      !(login instanceof InternalServerErrorException) &&
      !(login instanceof UnauthorizedException)
    ) {
      this.eventEmitter.emit(ADMIN_LOGIN, session, 'admin', login);
    }
    return login;
  }

  @Post('user/logout')
  @Redirect('/')
  userLogout(@Session() session: Record<string, unknown>) {
    this.eventEmitter.emit(USER_LOGOUT, session, 'user');
  }

  @Post('admin/logout')
  @Redirect('/')
  adminLogout(@Session() session: Record<string, unknown>) {
    this.eventEmitter.emit(ADMIN_LOGOUT, session, 'admin');
  }
}
