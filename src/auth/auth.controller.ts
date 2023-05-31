import { Controller, UseGuards, Post, Req, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { Request } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { TokensInterface } from './interfaces/tokens.interface';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { RegistrationDto } from './dto/registration.dto';
import { JwtResetPasswordGuard } from './guards/jwt-reset-password.guard';

import { User } from '../user/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  @ApiBody({ type: RegistrationDto })
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<void> {
    return this.authService.registration(registrationDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Req() req: Request): Promise<TokensInterface> {
    return this.authService.login(req.user as User);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() req: Request): Promise<TokensInterface> {
    const { sub } = req.user as JwtPayload;
    return this.authService.refresh(sub);
  }

  @UseGuards(JwtResetPasswordGuard)
  @Post('reset-password')
  resetPassword(
    @Req() req: Request,
      @Body('password') password?: string,
  ): Promise<TokensInterface> {
    const { email, sub } = req.user as JwtPayload;
    return this.authService.resetPassword(email, sub, password);
  }

  @Post('forgot-password')
  forgotPassword(
    @Body('email') email: string,
  ): Promise<void> {
    return this.authService.forgotPassword(email);
  }
}
