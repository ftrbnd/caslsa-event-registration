import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';
import { MemberType } from 'src/core/enums/member-type.enum';

export class UpdateUserDto {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  birthdate: Date;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @IsOptional()
  @IsEnum(MemberType)
  @ApiProperty({ enum: MemberType })
  memberType: MemberType;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  agencyId: number;
}
