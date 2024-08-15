import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { WebhookRequestBody } from '@line/bot-sdk';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LineService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async handleWebhook(req: WebhookRequestBody): Promise<void> {
    const client = this.configService.createLinebotClient();
    const events = req.events;

    events.forEach(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        if (event.message.text === 'count') {
          const user = await this.prisma.user.upsert({
            where: {
              id: event.source.userId,
            },
            update: {
              count: {
                increment: 1,
              },
            },
            create: {
              id: event.source.userId,
              count: 1,
            },
          });

          client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: 'text',
                text: user.count.toString(),
              },
            ],
          });
        } else {
          client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: 'text',
                text: event.message.text,
              },
            ],
          });
        }
      }
    });
  }
}
