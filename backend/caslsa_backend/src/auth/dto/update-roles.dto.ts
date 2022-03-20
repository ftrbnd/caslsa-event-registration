import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/core/enums/role.enum';

export class UpdateRoles {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  @ApiProperty({ enum: Role, isArray: true, example: [Role.User, Role.Admin] })
  roles: Role[];
}
