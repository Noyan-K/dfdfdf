import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './models/user.model';
import { CurrentUser } from './decorators/user.decorator.graphql';
import { UpdateUserInput } from './dto/update-user.input';

import { ValidatedUser } from '../auth/interfaces/validatedUser.interface';
import { GqlJwtAuthGuard } from '../auth/guards/gql-jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => User, { nullable: true, name: 'user' })
  findOne(@CurrentUser() user: ValidatedUser): Promise<User | null> {
    return this.userService.findOne(user.id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  update(
    @CurrentUser() user: ValidatedUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User | null> {
    return this.userService.update(user.id, updateUserInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => User, { nullable: true, name: 'getProfile' })
  getProfile(@CurrentUser() user: ValidatedUser): Promise<User | null> {
    return this.userService.getProfile(user.id);
  }
}
