import { Test, TestingModule } from '@nestjs/testing';
import { CountUpController } from './count-up.controller';

describe('CountUpController', () => {
  let controller: CountUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountUpController],
    }).compile();

    controller = module.get<CountUpController>(CountUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
