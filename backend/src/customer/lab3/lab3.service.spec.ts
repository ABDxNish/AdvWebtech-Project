import { Test, TestingModule } from '@nestjs/testing';
import { Lab3Service } from './lab3.service';

describe('Lab3Service', () => {
  let service: Lab3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Lab3Service],
    }).compile();

    service = module.get<Lab3Service>(Lab3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
