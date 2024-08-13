import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import {
  MessagingApiBlobClient,
  MessagingApiClient,
} from '@line/bot-sdk/dist/messaging-api/api';
import { RICH_MENU_REQUEST_A } from '../const/rich-menu-request-a';
import { promises } from 'fs';
import { AppService } from 'src/app.service';
import { RICH_MENU_REQUEST_B } from '../const/rich-menu-request-b';

@Injectable()
export class RichMenuService {
  private readonly client: MessagingApiClient;
  private readonly blobClient: MessagingApiBlobClient;

  constructor(
    configService: ConfigService,
    private readonly appService: AppService,
  ) {
    this.client = configService.createLinebotClient();
    this.blobClient = configService.createLinebotBlobClient();
  }

  async create() {
    const { richMenuId: richMenuAId } = await this.client.createRichMenu(
      RICH_MENU_REQUEST_A,
    );
    await this.setRichMenuImage(richMenuAId, '/images/richmenu-a.png');
    const { richMenuId: richMenuBId } = await this.client.createRichMenu(
      RICH_MENU_REQUEST_B,
    );
    await this.setRichMenuImage(richMenuBId, '/images/richmenu-b.png');
    await this.client.setDefaultRichMenu(richMenuAId);
    await this.client.createRichMenuAlias({
      richMenuAliasId: 'richmenu-alias-a',
      richMenuId: richMenuAId,
    });
    await this.client.createRichMenuAlias({
      richMenuAliasId: 'richmenu-alias-b',
      richMenuId: richMenuBId,
    });
  }

  async reset() {
    const richMenuAliasLists = await this.client.getRichMenuAliasList();
    for (const richMenuAlias of richMenuAliasLists.aliases) {
      await this.client.deleteRichMenuAlias(richMenuAlias.richMenuAliasId);
    }

    const richMenuLists = await this.client.getRichMenuList();
    for (const richMenu of richMenuLists.richmenus) {
      await this.client.deleteRichMenu(richMenu.richMenuId);
    }
  }

  // path は /images/a.png のような assets 配下のパスを指定する
  async setRichMenuImage(richMenuId: string, path: string) {
    const assetsPath = this.appService.getAssetsPath();
    const buffer = await promises.readFile(assetsPath + path);
    await this.blobClient.setRichMenuImage(
      richMenuId,
      new Blob([buffer], { type: 'image/png' }),
    );
  }
}
