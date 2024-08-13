import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAssetsPath(): string {
    return join(__dirname, '..', 'assets');
  }
}
