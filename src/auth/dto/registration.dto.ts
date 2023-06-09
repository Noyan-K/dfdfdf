import { ApiProperty } from '@nestjs/swagger';

import { IsEmail } from 'class-validator';

export class RegistrationDto {
    @ApiProperty()
    @IsEmail()
    email: string;
}
