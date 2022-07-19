import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  trimUserCollectionDocument,
  trimUserItemDocument,
  User,
  UserDocument,
} from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('users') readonly userModel: Model<UserDocument>) {}
  async addUser(
    user: CreateUserDto,
  ): Promise<User | InternalServerErrorException> {
    try {
      return await new this.userModel(user).save();
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async deleteUser(id: string) {
    try {
      return (
        (await this.userModel.findByIdAndDelete(id)) ?? new NotFoundException()
      );
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async updateUser(id: string, user: UpdateUserDto) {
    try {
      return (
        (await this.userModel.findByIdAndUpdate(id, user)) ??
        new NotImplementedException()
      );
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async getUserItem(
    id: string,
  ): Promise<UserDocument | InternalServerErrorException | NotFoundException> {
    try {
      const user = await this.userModel.findById(id);
      if (!(user instanceof BadRequestException)) {
        if (!user) {
          return new NotFoundException();
        }
      }
      return trimUserItemDocument(user);
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async getOneUserItem(filters: Record<string, unknown>) {
    try {
      const user = await this.userModel.findOne(filters);
      if (!user) {
        return new NotFoundException();
      }
      return trimUserItemDocument(user);
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async getUserCollection(
    id: string,
  ): Promise<UserDocument | InternalServerErrorException | NotFoundException> {
    try {
      const user = await this.userModel.findById(id);
      if (!(user instanceof BadRequestException)) {
        if (!user) {
          return new NotFoundException();
        }
      }
      return trimUserCollectionDocument(user);
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async getAllUsers(): Promise<
    NotFoundException | InternalServerErrorException | UserDocument[]
  > {
    try {
      return (await this.userModel.find()).map((e) =>
        trimUserCollectionDocument(e),
      );
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
