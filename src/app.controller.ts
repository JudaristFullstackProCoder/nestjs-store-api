import { Controller, Get, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Home Controller')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('session')
  getSession(@Session() session: Record<string, unknown>) {
    return session;
  }
}
