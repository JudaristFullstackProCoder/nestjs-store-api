import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Session,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiConsumes,
} from '@nestjs/swagger';
import { UserAuthenticationGuard } from './guards/user-auth.guard';
import { UserEntityMapClass } from './entities/user.entity.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from 'src/app/dto/file.upload.dto';
import { UpdateWriteOpResult } from 'mongoose';

class UserLoginInfo {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
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
  async create(@Req() request: Request, @Body() createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: UserEntityMapClass,
    isArray: true,
    status: 200,
  })
  findAll() {
    return this.usersService.findAll({});
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CreateUserDto,
    status: 200,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(UserAuthenticationGuard)
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: 'The record has been successfully updated.',
    status: 200,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(UserAuthenticationGuard)
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: 'The record has been successfully deleted.',
    status: 200,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The user has been successfully logged in.',
    type: 'The user has been successfully logged in.',
    status: 200,
  })
  @ApiBody({
    required: true,
    type: UserLoginInfo,
    description: 'user data',
  })
  login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Session() session: Record<string, unknown>,
  ) {
    return this.usersService.login(username, password, session);
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(UserAuthenticationGuard)
  @ApiOkResponse({
    description: 'The user has been successfully logged out.',
    type: 'The user has been successfully logged out.',
  })
  logout(@Session() session: Record<string, unknown>) {
    return this.usersService.logout(session);
  }

  @Post(':id/avatar/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'user avatar image',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', { dest: 'uploads', preservePath: false }),
  )
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<InternalServerErrorException | UpdateWriteOpResult> {
    return this.usersService.addUserImage(id, file);
  }
}
