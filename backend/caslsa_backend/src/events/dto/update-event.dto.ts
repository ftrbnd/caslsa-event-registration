import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @ApiProperty()
  ageGroup: string;

  @IsString()
  @ApiProperty()
  eventGroup: string;

  @IsString()
  @ApiProperty()
  eventName: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  eventDate: Date;
}
