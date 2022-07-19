import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_CREATED, USER_PERMISSION_CHANGE } from 'src/app.events';
import { FindUserDto } from './dto/find-user.dto';
import { PermissionsService } from 'src/services/permissions/permissions';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { USER_DEFAULTS_PERMISSIONS } from 'src/auth/perms/user';
import { MongooseObjectIdPipe } from 'src/utils/pipes/mongooseObjectId.pipe';
import { UserPermissionPipe } from 'src/utils/pipes/userPermission.pipe';
import { DeleteUserPermsDto } from './dto/delete-user-perms.dto';
import { AddUserPermsDto } from './dto/add-user-perms.dto';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
    @InjectModel('users') private readonly usersModel: Model<string>,
  ) {}

  @Post()
  @ApiBody({
    required: true,
    type: CreateUserDto,
    description: 'user data',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto,
    status: 201,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Session() session,
  ): Promise<User | InternalServerErrorException> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 15);
    const user = await this.usersService.create(createUserDto);
    if (user instanceof InternalServerErrorException) {
      return user;
    }
    this.eventEmitter.emit(USER_CREATED, session, 'user', user);
    return user;
  }

  @Get()
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    isArray: true,
    status: 200,
    type: CreateUserDto,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the server can't find the requested resource.",
    type: NotFoundException,
  })
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get('/all-available-perms')
  @ApiOkResponse({
    description: 'A list of permissions that every user can have',
    status: 200,
  })
  getAllAvailablesUserPerms() {
    return USER_DEFAULTS_PERMISSIONS;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CreateUserDto,
    status: 200,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the server can't find the requested resource.",
    type: NotFoundException,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('find')
  @ApiNotFoundResponse({
    status: 404,
    description: "the server can't find the requested resource.",
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorException,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    status: 500,
  })
  @ApiBody({
    type: FindUserDto,
    required: true,
    description: 'filters to find a user',
  })
  findOneWithFilters(@Body() filters: Record<string, unknown>) {
    return this.usersService.getOneUserItem(filters);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: 'The record has been successfully updated.',
    status: 200,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: 'The record has been successfully deleted.',
    status: 200,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the server can't find the requested resource.",
    type: NotFoundException,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/:userId/add-perms')
  @ApiBody({
    description: 'the permission (in camel case)',
    required: true,
    type: AddUserPermsDto,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  async addUserPermission(
    @Param('userId', MongooseObjectIdPipe) userId: string,
    @Body('perms', UserPermissionPipe) perms: string,
    @Session() session: Record<string, unknown>,
  ) {
    /** L'injection de dependances (du module user) dans le module admin ne fonctionne pas
        raison pour laquelle je doit utiliser ici le service d'administration
    */
    const result = await new PermissionsService().addUserPerms(
      perms,
      userId,
      this.usersModel,
    );
    this.eventEmitter.emit(
      USER_PERMISSION_CHANGE,
      session,
      result['permissions'],
    );
    return result;
  }

  @Post('/:userId/remove-perms')
  @ApiBody({
    description: 'the permission (in camel case)',
    required: true,
    type: DeleteUserPermsDto,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
  })
  async removeUserPermission(
    @Param('userId', MongooseObjectIdPipe) userId: string,
    @Body('perms', UserPermissionPipe) perms: string,
    @Session() session: Record<string, unknown>,
  ) {
    /** L'injection de dependances (du module user) dans le module admin ne fonctionne pas
        raison pour laquelle je doit utiliser ici le service d'administration 
    */
    const result = await new PermissionsService().removeUserPerms(
      perms,
      userId,
      this.usersModel,
    );
    this.eventEmitter.emit(
      USER_PERMISSION_CHANGE,
      session,
      result['permissions'],
    );
    return result;
  }
}
