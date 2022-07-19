import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async login(email: string, password: string, type: 'users' | 'admins') {
    try {
      const user = await (
        await fetch(`http://localhost:3001/${type}/find`, {
          body: JSON.stringify({ email }),
          method: 'POST',
        })
      ).json();
      if (
        user instanceof NotFoundException ||
        user instanceof InternalServerErrorException
      ) {
        return user;
      }
      const auth = await bcrypt.compare(password, user.password);
      if (auth === false) return new UnauthorizedException();
      return user;
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
