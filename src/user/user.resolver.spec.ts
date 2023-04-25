import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import User from './models/user.model';
import { ValidatedUser } from '../auth/interfaces/validatedUser.interface';

type CleanUser = Omit<User, 'password'>;

describe('UserController', () => {
  let userResolver: UserResolver;
  const user: CleanUser = {
    id: 1,
    email: 'john@john.ru',
    name: 'john',
  };

  const curUser: ValidatedUser = {
    id: 1,
    email: 'john@john.ru',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResolver],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(() => user),
          },
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => expect(userResolver).toBeDefined());

  it('getProfile: should get one profile', async () => {
    expect(await userResolver.getProfile(curUser)).toEqual(user);
  });
});
