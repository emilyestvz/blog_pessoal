import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// para definir um controlador no Spring Boot
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
