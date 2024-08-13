import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import {
  MessagingApiBlobClient,
  MessagingApiClient,
} from '@line/bot-sdk/dist/messaging-api/api';
import { RICH_MENU_REQUEST_A } from '../const/rich-menu-request-a';
import { join } from 'path';
import { promises } from 'fs';

@Injectable()
export class RichMenuService {
  private readonly client: MessagingApiClient;
  private readonly blobClient: MessagingApiBlobClient;

  constructor(configService: ConfigService) {
    this.client = configService.createLinebotClient();
    this.blobClient = configService.createLinebotBlobClient();
  }

  async create() {
    // const richMenuAId = this.client.createRichMenu(RICH_MENU_REQUEST_A);
    // await this.setRichMenuImage(richMenuAId, );
    console.log(__dirname);
  }

  async setRichMenuImage(richMenuId: string, path: string) {
    const filepath = join(__dirname, path);
    const buffer = await promises.readFile(filepath);
    this.blobClient.setRichMenuImage(richMenuId, new Blob([buffer]));
  }
}
