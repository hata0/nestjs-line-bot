import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineModule } from './line/line.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CountUpController } from './count-up/count-up.controller';
import { AuthModule } from './auth/auth.module';
import { GoogleMapModule } from './google-map/google-map.module';
import { PlacesController } from './places/places.controller';

@Module({
  imports: [
    LineModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    AuthModule,
    GoogleMapModule,
  ],
  controllers: [AppController, CountUpController, PlacesController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
