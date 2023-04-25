import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { TokensInterface } from './interfaces/tokens.interface';

describe('AuthController', () => {
  let authController: AuthController;
  let req: Request;
  let user: JwtPayload;
  const token: TokensInterface = {
    access_token: 'access',
    refresh_token: 'refresh',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(() => token),
            refresh: jest.fn(() => token),
          },
        },
      ],
    }).compile();

    user = {
      sub: 1,
      iat: 123123123,
      exp: 123123123,
      email: 'john@john.ru',
    };

    req = {
      user,
    } as unknown as Request;

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => expect(authController).toBeDefined());

  it('login: should give access and refresh tokens', async () => {
    expect(await authController.login(req)).toEqual<TokensInterface>({
      access_token: expect.any(String),
      refresh_token: expect.any(String),
    });
  });

  it('refresh:: should give access and refresh tokens', async () => {
    expect(await authController.refresh(req)).toEqual<TokensInterface>({
      access_token: expect.any(String),
      refresh_token: expect.any(String),
    });
  });
});
