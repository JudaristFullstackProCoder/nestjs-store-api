import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { mapToUserEntity, UserEntityMap } from './entities/user.entity.mapper';

@Injectable({ scope: Scope.DEFAULT })
export class UserRepository {
  constructor(@InjectModel('user') readonly userModel: Model<UserDocument>) {}
  async addUser(user: unknown): Promise<User | BadRequestException> {
    try {
      return await new this.userModel(user).save();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async deleteUSer(id: string) {
    try {
      return (
        (await this.userModel.findByIdAndDelete(id)) ?? new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async updateUser(id: string, user: unknown) {
    try {
      return (
        (await this.userModel.findByIdAndUpdate(id, user)) ??
        new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getUser(
    id: string,
  ): Promise<Record<string, unknown> | BadRequestException> {
    try {
      const user = await this.userModel.findById(id);
      if (!(user instanceof BadRequestException)) {
        if (!user) {
          return new NotFoundException();
        }
      }
      return mapToUserEntity(user);
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getOneUser(
    filters: Record<string, unknown>,
  ): Promise<User | BadRequestException> {
    try {
      return (await this.userModel.findOne(filters)) ?? new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getAllUsers(
    filters: Record<string, any>,
  ): Promise<User[] | BadRequestException | UserEntityMap[]> {
    try {
      return (
        (await this.userModel.find(filters)).map((e) => mapToUserEntity(e)) ??
        new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async addUserImage(
    id: string,
    image: Express.Multer.File,
  ): Promise<InternalServerErrorException | UpdateWriteOpResult> {
    try {
      return await this.userModel.updateOne({ _id: id }, { image }).exec();
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
