import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateEventDto {
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
