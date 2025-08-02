import { Test, TestingModule } from '@nestjs/testing';
import { Lab3Controller } from './lab3.controller';

describe('Lab3Controller', () => {
  let controller: Lab3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Lab3Controller],
    }).compile();

    controller = module.get<Lab3Controller>(Lab3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
