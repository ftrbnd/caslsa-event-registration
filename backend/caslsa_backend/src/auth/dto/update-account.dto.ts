import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { Gender } from 'src/core/enums/gender.enum';
import { MemberType } from 'src/core/enums/member-type.enum';

class UpdateAccountDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty()
  birthdate: Date;

  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @IsEnum(MemberType)
  @ApiProperty({ enum: MemberType })
  memberType: MemberType;

  @IsNumber()
  @ApiProperty()
  agencyId: number;
}

export class PartialUpdateAccountDto extends PartialType(UpdateAccountDto) {}
