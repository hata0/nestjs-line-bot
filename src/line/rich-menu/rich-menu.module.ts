import { Module, OnModuleInit } from '@nestjs/common';
import { RichMenuService } from './rich-menu.service';
import { ConfigService } from '../config/config.service';

@Module({
  providers: [RichMenuService, ConfigService],
})
export class RichMenuModule implements OnModuleInit {
  constructor(private readonly richMenuService: RichMenuService) {}

  async onModuleInit() {
    await this.richMenuService.create();
  }
}
