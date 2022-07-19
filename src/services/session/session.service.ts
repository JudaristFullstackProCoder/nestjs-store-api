import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  ADMIN_CREATED,
  ADMIN_CREATED_SESSION_REGISTERED,
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  USER_CREATED,
  USER_CREATED_SESSION_REGISTERED,
  USER_LOGIN,
  USER_LOGOUT,
  USER_PERMISSION_CHANGE,
} from 'src/app.events';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class SessionService {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent(USER_CREATED)
  handleUserCreatedEvent(
    session: Record<string, any>,
    key: string,
    data: User,
  ) {
    session[key] = data;
    this.eventEmitter.emit(USER_CREATED_SESSION_REGISTERED);
  }

  @OnEvent(ADMIN_CREATED)
  handleAdminCreatedEvent(
    session: Record<string, any>,
    key: string,
    data: User,
  ) {
    session[key] = data;
    this.eventEmitter.emit(ADMIN_CREATED_SESSION_REGISTERED);
  }

  @OnEvent(ADMIN_LOGIN)
  handleAdminLoginEvent(
    session: Record<string, any>,
    key: string,
    data: UserDocument,
  ) {
    session[key] = data;
  }

  @OnEvent(ADMIN_LOGOUT)
  handleAdminLogoutEvent(session: Record<string, any>, key: string) {
    session[key] = null;
  }

  @OnEvent(USER_LOGIN)
  handleUserLoginEvent(
    session: Record<string, any>,
    key: string,
    data: UserDocument,
  ) {
    session[key] = data;
  }

  @OnEvent(USER_LOGOUT)
  handleUserLogoutEvent(session: Record<string, any>, key: string) {
    session[key] = null;
  }

  @OnEvent(USER_PERMISSION_CHANGE)
  handleUserRoleChange(
    session: Record<string, any>,
    newPermissions: Record<string, unknown>[],
  ) {
    session['user']['permissions'] = newPermissions;
  }
}
