import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RolesModule } from './roles/roles.module';
import { TypeModule } from './types/types.module';
import { AddressModule } from './address/address.module';
import { DeliveryModule } from './delivery/delivery.module';
import { SizeModule } from './size/size.module';
import { OrderSizeModule } from './order/order-size/order-size.module';
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
    DocumentModule,
    SupplierModule,
    OrderModule,
    RolesModule,
    TypeModule,
    AddressModule,
    DeliveryModule,
    SizeModule,
    OrderSizeModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
