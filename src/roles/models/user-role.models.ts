import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { UserRoleModel } from './user-role';

@ObjectType()
export class UserRole extends UserRoleModel {
  @Field(() => [User])
    User: User[];
}
