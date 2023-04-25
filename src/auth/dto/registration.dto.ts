import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class RegistrationDto extends LoginDto {
  @ApiProperty()
  @Length(2, 50)
    name: string;
}
