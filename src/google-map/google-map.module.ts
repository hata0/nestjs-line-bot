import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GoogleMapModule {}
