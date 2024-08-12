import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { WebhookRequestBody } from '@line/bot-sdk';

@Injectable()
export class LineService {
  constructor(private configService: ConfigService) {}

  async handleWebhook(req: WebhookRequestBody): Promise<void> {
    const client = this.configService.createLinebotClient();
    const events = req.events;

    events.forEach((event) => {
      if (event.type === 'message') {
        const returnMessage =
          event.message.type === 'text' ? event.message.text : 'No Text';
        client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: 'text',
              text: returnMessage,
            },
          ],
        });
      }
    });
  }
}
