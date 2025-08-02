import { Test, TestingModule } from '@nestjs/testing';
import { Lab2Controller } from './lab2.controller';

describe('Lab2Controller', () => {
  let controller: Lab2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Lab2Controller],
    }).compile();

    controller = module.get<Lab2Controller>(Lab2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
