import { Module, OnModuleInit } from '@nestjs/common';
import { RichMenuService } from './rich-menu.service';
import { ConfigService } from '../config/config.service';
import { AppService } from 'src/app.service';

@Module({
  providers: [RichMenuService, ConfigService, AppService],
})
export class RichMenuModule implements OnModuleInit {
  constructor(private readonly richMenuService: RichMenuService) {}

  async onModuleInit() {
    await this.richMenuService.create();
  }
}
