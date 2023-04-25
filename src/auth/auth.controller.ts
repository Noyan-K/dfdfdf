import {
  Controller, UseGuards, Post, Req, Body,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { TokensInterface } from './interfaces/tokens.interface';
import { User } from '../user/models/user.model';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('registration')
  // @ApiBody({ type: RegistrationDto })
  // async registration(
  //   @Body() registrationDto: RegistrationDto,
  // ): Promise<TokensInterface> {
  //   return this.authService.registration(registrationDto);
  // }

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
}
