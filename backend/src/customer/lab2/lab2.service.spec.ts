import { Test, TestingModule } from '@nestjs/testing';
import { Lab2Service } from './lab2.service';

describe('Lab2Service', () => {
  let service: Lab2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Lab2Service],
    }).compile();

    service = module.get<Lab2Service>(Lab2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
