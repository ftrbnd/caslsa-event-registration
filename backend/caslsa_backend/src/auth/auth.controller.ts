import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthEmailDto } from './dto/auth-email.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Create an account, can only create basic user account
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  // login with an existing account, give a token back
  @Post('/login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return { token: await this.authService.loginUser(authCredentialsDto) };
  }

  // Get information of the user related to the bearer token provided
  @ApiBearerAuth()
  @Get('/user')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request) {
    return await this.authService.getUser(request);
  }

  // Get a list of all the users (Only for admin)
  @ApiBearerAuth()
  @Get('/users')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return await this.authService.getUsers();
  }

  // Delete the user related to the email given (Only admin)
  @ApiBearerAuth()
  @Delete('/user')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body() auth: AuthEmailDto) {
    return await this.authService.deleteUser(auth);
  }
}
