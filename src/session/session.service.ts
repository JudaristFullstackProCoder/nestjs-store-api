import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  USER_CREATED,
  USER_CREATED_SESSION_REGISTERED,
  USER_LOGIN,
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
  @OnEvent(USER_LOGIN)
  handleUserLoginEvent(
    session: Record<string, any>,
    key: string,
    data: UserDocument,
  ) {
    session[key] = data;
    this.eventEmitter.emit(USER_CREATED_SESSION_REGISTERED);
  }
}
