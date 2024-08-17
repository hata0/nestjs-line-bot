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
      const user = await this.prisma.user.findUnique({
        where: { id: data.sub },
      });
      if (!user) {
        throw new UnauthorizedException('No user found for this token');
      } else {
        return data;
      }
    } catch (e) {
      if (
        e instanceof UnauthorizedException &&
        e.message === 'No user found for this token'
      ) {
        throw e;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
