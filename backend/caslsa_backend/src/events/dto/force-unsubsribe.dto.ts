import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ForceUnsubscribeDTO {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  eventId: string;
}
