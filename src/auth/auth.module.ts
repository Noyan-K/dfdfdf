import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import PrismaModule from 'src/prisma/prisma.module';
import { RolesModule } from 'src/roles/roles.module';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

import { UserModule } from '../user/user.module';
import { SupplierModule } from '../supplier/supplier.module';
import { MailModule } from '../mail/mail.module';
import { JwtResetPasswordStrategy } from './strategies/jwt-resest-password.strategy';

@Module({
  imports: [
    UserModule,
    RolesModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({}),
    SupplierModule,
    MailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy, JwtResetPasswordStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
