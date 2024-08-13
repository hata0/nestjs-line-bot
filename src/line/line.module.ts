import { Module } from '@nestjs/common';
import { LineController } from './line.controller';
import { LineService } from './line.service';
import { ConfigService } from './config/config.service';
import { RichMenuModule } from './rich-menu/rich-menu.module';

@Module({
  controllers: [LineController],
  providers: [LineService, ConfigService],
  imports: [RichMenuModule],
})
export class LineModule {}
