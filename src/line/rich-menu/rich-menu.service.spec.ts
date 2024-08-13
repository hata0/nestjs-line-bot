import { Test, TestingModule } from '@nestjs/testing';
import { RichMenuService } from './rich-menu.service';

describe('RichMenuService', () => {
  let service: RichMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RichMenuService],
    }).compile();

    service = module.get<RichMenuService>(RichMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
