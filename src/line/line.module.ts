import { Module } from '@nestjs/common';
import { LineController } from './line.controller';
import { LineService } from './line.service';
import { ConfigService } from './config/config.service';

@Module({
  controllers: [LineController],
  providers: [LineService, ConfigService],
  imports: [],
})
export class LineModule {}
