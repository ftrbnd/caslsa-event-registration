import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthEmailDto {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;
}
