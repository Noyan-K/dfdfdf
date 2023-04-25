import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common/decorators';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';
import { ValidatedUser } from 'src/auth/interfaces/validatedUser.interface';
import { CurrentUser } from 'src/user/decorators/user.decorator.graphql';
import { AddressService } from './address.service';
import { Address } from './models/address.model';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { AddressModel } from './models/address';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Address)
  createAddress(
    @CurrentUser() user: ValidatedUser,
      @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ): Promise<AddressModel> {
    return this.addressService.create(user.id, createAddressInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Address], { name: 'addresses' })
  findAll(
    @CurrentUser() user: ValidatedUser,
      @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
      @Args('supplier_id', { type: () => Int, nullable: true }) supplier_id?: number,
  ): Promise<AddressModel[]> {
    return this.addressService.findAll(user.id, skip, take, supplier_id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => Address, { name: 'address' })
  findOne(
    @CurrentUser() user: ValidatedUser,
      @Args('id', { type: () => Int }) id: number,
  ): Promise<AddressModel | null> {
    return this.addressService.findOne(id, user.id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Address)
  updateAddress(
    @CurrentUser() user: ValidatedUser,
      @Args('id', { type: () => Int }) id: number,
      @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
  ): Promise<AddressModel | null> {
    return this.addressService.update(id, user.id, updateAddressInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Address)
  removeAddress(
    @CurrentUser() user: ValidatedUser,
      @Args('id', { type: () => Int }) id: number,
  ): Promise<AddressModel | null> {
    return this.addressService.remove(id, user.id);
  }
}
