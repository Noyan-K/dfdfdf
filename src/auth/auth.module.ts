import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import PrismaModule from 'src/prisma/prisma.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { SupplierModule } from '../supplier/supplier.module';

@Module({
  imports: [
    UserModule,
    RolesModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({}),
    SupplierModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
