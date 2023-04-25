import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { ProfileModel } from './profile';

@ObjectType()
export class Profile extends ProfileModel {
  @Field(() => User)
    User?: User;
}
