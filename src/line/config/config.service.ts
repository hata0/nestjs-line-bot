import { ClientConfig, messagingApi } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly clientConfig: ClientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
  };

  createLinebotClient() {
    return new messagingApi.MessagingApiClient(this.clientConfig);
  }

  createLinebotBlobClient() {
    return new messagingApi.MessagingApiBlobClient(this.clientConfig);
  }
}
