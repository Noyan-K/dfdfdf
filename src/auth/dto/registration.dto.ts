import { ApiProperty } from '@nestjs/swagger';

import { Length } from 'class-validator';

import { LoginDto } from './login.dto';

export class RegistrationDto extends LoginDto {
  @ApiProperty()
  @Length(2, 50)
  name: string;
}
