import {
  BadRequestException,
  Delete,
  Get,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { mapToUserEntity } from './entities/user.entity.mapper';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import {
  LOGIN_USER,
  LOGOUT_USER,
  SuccessApiResponse,
} from 'src/app/utils/api.controller.response';
import { UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@Inject(UserRepository) private repo: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.repo.addUser(createUserDto);
    if (!(user instanceof BadRequestException)) {
      return mapToUserEntity(user);
    }
    return new BadRequestException();
  }
  async findAll(filters: Record<string, unknown> = {}) {
    return await this.repo.getAllUsers(filters);
  }
  @Get('id')
  async findOne(@Param('id') id: string) {
    return await this.repo.getUser(id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, updateUserDto: UpdateUserDto) {
    return await this.repo.updateUser(id, updateUserDto);
  }
  @Delete('id')
  async remove(@Param('id') id: string) {
    return await this.repo.deleteUSer(id);
  }
  @Post()
  async login(
    username: string,
    password: string,
    session: Record<string, unknown>,
  ): Promise<string | Record<string, unknown> | NotFoundException> {
    const user = await this.repo.getOneUser({ username });
    if (!(user instanceof BadRequestException)) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth === false) return new UnauthorizedException();
      if (auth === true) {
        session.user = mapToUserEntity(user);
        return SuccessApiResponse(LOGIN_USER, 'user');
      }
    }
    if (!user) {
      session.user = false;
      return new NotFoundException();
    }
  }
  @Post()
  logout(session: Record<string, unknown>) {
    session.user = false;
    return SuccessApiResponse(LOGOUT_USER, 'user');
  }
  @Post()
  addUserImage(
    id: string,
    image: Express.Multer.File,
  ): Promise<InternalServerErrorException | UpdateWriteOpResult> {
    return this.repo.addUserImage(id, image);
  }
}
