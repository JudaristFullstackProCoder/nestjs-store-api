import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}
  async login(email: string, password: string) {
    const user = await this.userRepository.getOneUserItem({ email });
    if (
      user instanceof NotFoundException ||
      user instanceof InternalServerErrorException
    ) {
      return user;
    }
    const auth = await bcrypt.compare(password, user.password);
    if (auth === false) return new UnauthorizedException();
    return user;
  }
}
