import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { DescriptionModule } from './description/description.module';
import { DocumentModule } from './document/document.module';
import { SupplierModule } from './supplier/supplier.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { CartProductModule } from './cart/cart-product/cart-product.module';
import { RolesModule } from './roles/roles.module';
import { ProfileModule } from './profile/profile.module';
import { TypeModule } from './types/types.module';
import { AddressModule } from './address/address.module';
import { DeliveryModule } from './delivery/delivery.module';
import { SizeModule } from './size/size.module';
import { CartSizeModule } from './cart/cart-size/cart-size.module';
import config from './config';
import PrismaModule from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      playground: true,
      driver: ApolloDriver,
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProductModule,
    DescriptionModule,
    DocumentModule,
    SupplierModule,
    CartModule,
    CategoryModule,
    CartProductModule,
    RolesModule,
    ProfileModule,
    TypeModule,
    AddressModule,
    DeliveryModule,
    SizeModule,
    CartSizeModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
