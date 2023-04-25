import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common/decorators';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';
import { SupplierService } from './supplier.service';
import { Supplier } from './models/supplier.model';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { FindSuppliersInput } from './dto/find-suppliers.input';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Supplier)
  createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
  ): Promise<Supplier> {
    return this.supplierService.create(createSupplierInput);
  }

  @Query(() => [Supplier], { name: 'suppliers' })
  findAll(
    @Args('findSuppliersInput') findSuppliersInput?: FindSuppliersInput,
      @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<Supplier[]> {
    return this.supplierService.findAll(findSuppliersInput, take, skip);
  }

  @Query(() => Supplier, { name: 'supplier', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Supplier | null> {
    return this.supplierService.findOne(id);
  }

  @Mutation(() => Supplier, { name: 'updateSupplier', nullable: true })
  updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput,
  ): Promise<Supplier | null> {
    return this.supplierService.update(
      updateSupplierInput.id,
      updateSupplierInput,
    );
  }

  @Mutation(() => Supplier)
  removeSupplier(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Supplier> {
    return this.supplierService.remove(id);
  }
}
