import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortByEnum } from '../../types/sort.type';

@InputType()
export class FindSuppliersInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    search: string;

  @IsOptional()
  @IsEnum(SortByEnum)
  @Field(() => SortByEnum, { nullable: true })
    sort_by?: SortByEnum;
}
