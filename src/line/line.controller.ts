import { Body, Controller, Post } from '@nestjs/common';
import { LineService } from './line.service';
import { WebhookRequestBody } from '@line/bot-sdk';

@Controller('line')
export class LineController {
  constructor(private lineService: LineService) {}

  @Post()
  async handler(@Body() req: WebhookRequestBody) {
    return this.lineService.handleWebhook(req);
  }
}
