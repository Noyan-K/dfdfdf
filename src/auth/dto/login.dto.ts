import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
    email: string;

  @ApiProperty()
  @Length(4, 100)
    password: string;
}
