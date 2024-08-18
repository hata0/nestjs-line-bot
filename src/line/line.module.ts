import { Module } from '@nestjs/common';
import { LineController } from './line.controller';
import { LineService } from './line.service';
import { ConfigService } from './config/config.service';
import { RichMenuModule } from './rich-menu/rich-menu.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LineController],
  providers: [LineService, ConfigService, PrismaService],
  imports: [RichMenuModule],
  exports: [ConfigService],
})
export class LineModule {}
