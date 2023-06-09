import { InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(
    OmitType(CreateProductInput, ['mannequin_document_id', 'preview_document_id']),
) {}
