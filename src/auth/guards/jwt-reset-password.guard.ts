import { Injectable } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtResetPasswordGuard extends AuthGuard('jwt-reset-password') {}
