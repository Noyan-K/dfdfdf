import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CurrencyModule } from './currency/currency.module';
import { DescriptionModule } from './description/description.module';
import { DocumentModule } from './document/document.module';
import { LanguageModule } from './language/language.module';
import { ModelModule } from './model/model.module';
import { SupplierModule } from './supplier/supplier.module';
import { VendorModule } from './vendor/vendor.module';
import { CurrencyRateModule } from './currency-rate/currency-rate.module';
import { SupplierProductPriceModule } from './supplier-product-price/supplier-product-price.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { CartProductModule } from './cart/cart-product/cart-product.module';
import { RolesModule } from './roles/roles.module';
import { ProfileModule } from './profile/profile.module';
import { ModelProductModule } from './model/model-product/model-product.module';
import { TypeModule } from './types/types.module';
import { AddressModule } from './address/address.module';
import { DeliveryModule } from './delivery/delivery.module';
import { SizeModule } from './size/size.module';
import { ClothStyleModule } from './cloth-style/cloth-style.module';
import { NodeProcessingModule } from './node-processing/node-processing.module';
import { FabricModule } from './fabric/fabric.module';
import { CategoriesOnClothStyleModule } from './categories-on-cloth-style/categories-on-cloth-style.module';
import { ContactModule } from './contact/contact.module';
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
    CurrencyModule,
    DescriptionModule,
    DocumentModule,
    LanguageModule,
    ModelModule,
    SupplierModule,
    VendorModule,
    CurrencyRateModule,
    SupplierProductPriceModule,
    CartModule,
    CategoryModule,
    CartProductModule,
    RolesModule,
    ProfileModule,
    ModelProductModule,
    TypeModule,
    AddressModule,
    DeliveryModule,
    SizeModule,
    ClothStyleModule,
    NodeProcessingModule,
    FabricModule,
    CategoriesOnClothStyleModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
