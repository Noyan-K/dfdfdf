import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../interfaces/jwtPayload.interface';
import { ValidatedUser } from '../interfaces/validatedUser.interface';

@Injectable()
export class JwtResetPasswordStrategy extends PassportStrategy(Strategy, 'jwt-reset-password') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_RESET_PASSWORD_SECRET'),
        });
    }

    validate = (payload: JwtPayload): ValidatedUser => ({
        id: payload.sub,
        email: payload.email,
        roles: payload.roles,
    });
}
