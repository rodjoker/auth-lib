import { Test, TestingModule } from '@nestjs/testing';
import { NuveiService } from './nuvei.service';


describe('NuveiService', () => {
  let service: NuveiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NuveiService],
    }).compile();

    service = module.get<NuveiService>(NuveiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


