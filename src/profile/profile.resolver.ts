import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './models/profile.model';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ProfileModel } from './models/profile';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<ProfileModel> {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true })
      skip?: number,
      @Args('take', { type: () => Int, nullable: true })
      take?: number,
  ): Promise<ProfileModel[]> {
    return this.profileService.findAll(skip, take);
  }

  @Query(() => Profile, { name: 'profile', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ProfileModel | null> {
    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ): Promise<ProfileModel | null> {
    return this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Mutation(() => Profile)
  removeProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ProfileModel> {
    return this.profileService.delete(id);
  }
}
