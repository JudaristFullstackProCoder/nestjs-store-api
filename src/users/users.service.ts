import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@Inject(UsersRepository) private repository: UsersRepository) {}
  create(user: CreateUserDto) {
    return this.repository.addUser(user);
  }

  findAllUsers() {
    return this.repository.getAllUsers();
  }

  findOne(id: string) {
    return this.repository.getUserItem(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.repository.deleteUser(id);
  }

  getOneUserItem(filters: Record<string, unknown>) {
    return this.repository.getOneUserItem(filters);
  }
}
