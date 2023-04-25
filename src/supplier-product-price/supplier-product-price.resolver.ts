import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { SupplierProductPriceService } from './supplier-product-price.service';
import { SupplierProductPrice } from './models/supplier-product-price.models';
import { CreateSupplierProductPriceInput } from './dto/create-supplier-product-price.input';
import { UpdateSupplierProductPriceInput } from './dto/update-supplier-product-price.input';

@Resolver(() => SupplierProductPrice)
export class SupplierProductPriceResolver {
  constructor(
    private readonly supplierProductPriceService: SupplierProductPriceService,
  ) {}

  @Mutation(() => SupplierProductPrice)
  createSupplierProductPrice(
    @Args('createSupplierProductPriceInput')
      createSupplierProductPriceInput: CreateSupplierProductPriceInput,
  ): Promise<SupplierProductPrice> {
    return this.supplierProductPriceService.create(
      createSupplierProductPriceInput,
    );
  }

  @Query(() => [SupplierProductPrice], { name: 'supplierProductPrices' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<SupplierProductPrice[]> {
    return this.supplierProductPriceService.findAll(take, skip);
  }

  @Query(() => SupplierProductPrice, {
    name: 'supplierProductPrice',
    nullable: true,
  })
  findOne(
    @Args('product_id', { type: () => Int }) product_id: number,
      @Args('supplier_id', { type: () => Int }) supplier_id: number,
      @Args('price_date', { type: () => Date }) price_date: Date,
  ): Promise<SupplierProductPrice | null> {
    return this.supplierProductPriceService.findOne(
      product_id,
      supplier_id,
      price_date,
    );
  }

  @Mutation(() => SupplierProductPrice)
  updateSupplierProductPrice(
    @Args('updateSupplierProductPriceInput')
      updateSupplierProductPriceInput: UpdateSupplierProductPriceInput,
  ): Promise<SupplierProductPrice | null> {
    return this.supplierProductPriceService.update(
      updateSupplierProductPriceInput.product_id,
      updateSupplierProductPriceInput.supplier_id,
      updateSupplierProductPriceInput.price_date,
      updateSupplierProductPriceInput,
    );
  }

  @Mutation(() => SupplierProductPrice)
  removeSupplierProductPrice(
    @Args('product_id', { type: () => Int }) product_id: number,
      @Args('supplier_id', { type: () => Int }) supplier_id: number,
      @Args('price_date', { type: () => GraphQLISODateTime }) price_date: Date,
  ): Promise<SupplierProductPrice> {
    return this.supplierProductPriceService.remove(
      product_id,
      supplier_id,
      price_date,
    );
  }
}
