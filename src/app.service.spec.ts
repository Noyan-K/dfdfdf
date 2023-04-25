import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('UsersService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => expect(appService).toBeDefined());

  it('getHello: should return string', async () => {
    expect(appService.getHello()).toEqual(
      'Welcome to Marketplace backend service',
    );
  });
});
