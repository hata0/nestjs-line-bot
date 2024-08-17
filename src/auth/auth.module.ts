import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from 'src/line/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LineAuthStrategy } from './line-auth.strategy';
import { LineAuthGuard } from './line-auth.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'line-auth' })],
  providers: [PrismaService, ConfigService, LineAuthStrategy, LineAuthGuard],
  exports: [LineAuthGuard],
})
export class AuthModule {}
