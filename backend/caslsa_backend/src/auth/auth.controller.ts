import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthEmailDto } from './dto/auth-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialUpdateAccountDto } from './dto/update-account.dto';
import { UpdateRoles } from './dto/update-roles.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Create an account, can only create basic user account',
  })
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'login with an existing account, give a token back',
  })
  @Post('/login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return { token: await this.authService.loginUser(authCredentialsDto) };
  }

  @ApiOperation({
    summary:
      'Get information of the account related to the bearer token provided',
  })
  @ApiBearerAuth()
  @Get('/account')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request) {
    return await this.authService.getUser(request);
  }

  @ApiOperation({ summary: 'Get a list of all the users (Only for admin)' })
  @ApiBearerAuth()
  @Get('/users')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return await this.authService.getUsers();
  }

  @ApiOperation({
    summary: 'Delete the user related to the email given (Only admin)',
  })
  @ApiBearerAuth()
  @Delete('/user')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body() auth: AuthEmailDto) {
    return await this.authService.deleteUser(auth);
  }

  @ApiOperation({ summary: 'Delete own account for user' })
  @ApiBearerAuth()
  @Delete('/account')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async deleteOwnAccount(@Req() request) {
    return await this.authService.deleteOwnAccount(request);
  }

  @ApiOperation({ summary: 'Update account roles (Only admin)' })
  @ApiBearerAuth()
  @Patch('/roles')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async updateRoles(@Body() user: UpdateRoles) {
    return await this.authService.updateRoles(user);
  }

  @ApiOperation({ summary: 'Edit account' })
  @ApiBearerAuth()
  @Patch('/account')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async updateAccount(@Req() request, @Body() user: PartialUpdateAccountDto) {
    return await this.authService.updateAccount(request, user);
  }

  @ApiOperation({ summary: 'Edit user (Admin Only)' })
  @ApiBearerAuth()
  @Patch('/user')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() user: UpdateUserDto) {
    return await this.authService.updateUser(user);
  }
}
