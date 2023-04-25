import { ObjectType } from '@nestjs/graphql';
import { SizeModel } from './size';

@ObjectType()
export class Size extends SizeModel {}
