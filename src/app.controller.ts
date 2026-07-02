import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { AppService } from './app.service.js';
import { ResponseMessage } from './common/decorators/response-message.decorator.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowAnonymous()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('custom')
  @AllowAnonymous()
  @ResponseMessage('Custom message loaded')
  getCustom(): string {
    return 'Custom content';
  }
}
