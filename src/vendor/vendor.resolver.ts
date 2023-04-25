import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { VendorService } from './vendor.service';
import { Vendor } from './models/vendor.models';
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';

@Resolver(() => Vendor)
export class VendorResolver {
  constructor(private readonly vendorService: VendorService) {}

  @Mutation(() => Vendor)
  createVendor(
    @Args('createVendorInput') createVendorInput: CreateVendorInput,
  ): Promise<Vendor> {
    return this.vendorService.create(createVendorInput);
  }

  @Query(() => [Vendor], { name: 'vendors' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
      @Args('vendor_id', { type: () => Int, nullable: true }) vendor_id?: number,
  ): Promise<Vendor[]> {
    return this.vendorService.findAll(take, skip, vendor_id);
  }

  @Query(() => Vendor, { name: 'vendor', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Vendor | null> {
    return this.vendorService.findOne(id);
  }

  @Mutation(() => Vendor)
  updateVendor(
    @Args('updateVendorInput') updateVendorInput: UpdateVendorInput,
  ): Promise<Vendor | null> {
    return this.vendorService.update(updateVendorInput.id, updateVendorInput);
  }

  @Mutation(() => Vendor)
  removeVendor(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Vendor | null> {
    return this.vendorService.remove(id);
  }

  @Query(() => [Vendor], { name: 'getFilteredVendorsList' })
  getFilteredVendorsList(): Promise<Vendor[]> {
    return this.vendorService.getFilteredVendorsList();
  }

  @Query(() => [Vendor], { name: 'getVendorsModelList' })
  getVendorsModelList(
    @Args('vendor_id', { type: () => Int, nullable: true }) vendor_id?: number,
  ): Promise<Vendor[]> {
    return this.vendorService.getVendorsModelList(vendor_id);
  }
}
