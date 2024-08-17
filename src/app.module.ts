import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineModule } from './line/line.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CountUpController } from './count-up/count-up.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './line/config/config.service';

@Module({
  imports: [
    LineModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    AuthModule,
  ],
  controllers: [AppController, CountUpController],
  providers: [AppService, PrismaService, ConfigService],
})
export class AppModule {}
