import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

import { ClothSexEnum, MannequinPositionEnum } from '@prisma/client';

@ObjectType()
export class ProductModel {
    @Field(() => Int)
    id: number;

    @Field(() => Int, { nullable: true })
    parent_id: number | null;

    @Field(() => String)
    name: string;

    @Field(() => MannequinPositionEnum, { nullable: true })
    mannequin: MannequinPositionEnum | null;

    @Field(() => ClothSexEnum, { nullable: true })
    sex: ClothSexEnum | null;

    @Field(() => String, { nullable: true })
    description: string | null;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}

registerEnumType(MannequinPositionEnum, {
    name: 'MannequinPositionEnum',
});

registerEnumType(ClothSexEnum, {
    name: 'ClothSexEnum',
});
