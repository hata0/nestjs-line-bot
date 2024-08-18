import { VerifyIDToken } from '@line/bot-sdk';
import { Controller, Put, Req, UseGuards } from '@nestjs/common';
import { LineAuthGuard } from 'src/auth/line-auth.guard';
import { ConfigService } from 'src/line/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('count-up')
@UseGuards(LineAuthGuard)
export class CountUpController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  @Put()
  async putCountUp(@Req() req) {
    const data: VerifyIDToken = req.user;
    const user = await this.prisma.user.upsert({
      where: {
        id: data.sub,
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        id: data.sub,
        count: 1,
      },
    });
    const client = this.config.createLinebotClient();
    return client.pushMessage({
      to: data.sub,
      messages: [
        {
          type: 'text',
          text: user.count.toString(),
        },
      ],
    });
  }
}
