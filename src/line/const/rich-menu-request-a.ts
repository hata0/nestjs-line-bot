import { RichMenuRequest } from '@line/bot-sdk/dist/messaging-api/api';

export const RICH_MENU_REQUEST_A: RichMenuRequest = {
  size: {
    width: 2500,
    height: 1686,
  },
  selected: false,
  name: 'richmenu-a',
  chatBarText: 'Tap to open',
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 1250,
        height: 1686,
      },
      action: {
        type: 'uri',
        uri: 'https://line.me/R/nv/location/',
      },
    },
    {
      bounds: {
        x: 1251,
        y: 0,
        width: 1250,
        height: 1686,
      },
      action: {
        type: 'richmenuswitch',
        richMenuAliasId: 'richmenu-alias-b',
        data: 'richmenu-changed-to-b',
      },
    },
  ],
};
