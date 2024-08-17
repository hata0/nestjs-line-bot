import { OAuth } from '@line/bot-sdk';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { ConfigService } from 'src/line/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LineAuthStrategy extends PassportStrategy(Strategy, 'line-auth') {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  async validate(idToken: string) {
    try {
      const auth = new OAuth();
      const data = await auth.verifyIdToken(
        idToken,
        this.config.frontendChannelId,
      );
      console.log(data);
      return data;
    } catch (e) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}
