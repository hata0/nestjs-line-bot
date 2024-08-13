import { Module, OnModuleInit } from '@nestjs/common';

@Module({})
export class RichMenuModule implements OnModuleInit {
  onModuleInit() {
    console.log('onModuleInit');
  }
}
