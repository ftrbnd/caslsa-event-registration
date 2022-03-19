import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/core/enums/role.enum';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthEmailDto } from './dto/auth-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new BadRequestException('Email already exists');
    } else {
      const newUser = new this.userModel({
        email: createUserDto.email,
        name: createUserDto.name,
        roles: [Role.User],
        password: createUserDto.password,
      });
      return await newUser.save().then((user) => {
        return user.toObject({ versionKey: false });
      });
    }
  }

  async loginUser(authCredentialsDto: AuthCredentialsDto) {
    const user: any = await this.userModel.findOne({
      email: authCredentialsDto.email,
    });
    if (!user) throw new BadRequestException('User not found');
    return new Promise((resolve, reject) => {
      user.checkPassword(authCredentialsDto.password, (err, isMatch) => {
        if (err) reject(new UnauthorizedException());
        if (isMatch) {
          const payload = this.jwtService.sign({
            _id: user._id,
            roles: user.roles,
            email: user.email,
          });
          resolve(payload);
        } else {
          reject(new BadRequestException('Bad credentials'));
        }
      });
    });
  }

  async getUser(request) {
    if (request.user) {
      const user = await this.userModel.findOne({ email: request.user });
      if (!user) throw new UnauthorizedException();
      return user.toObject({ versionKey: false });
    } else {
      throw new UnauthorizedException();
    }
  }

  async getUsers() {
    return this.userModel.find();
  }

  async deleteUser(auth: AuthEmailDto) {
    if (!auth.email) throw new BadRequestException('Need email in body.');

    return new Promise((resolve, reject) => {
      this.userModel
        .findOneAndDelete({ email: auth.email })
        .then((e) => {
          if (e) resolve('Account deleted');
          else reject(new BadRequestException('User doesnt exist'));
        })
        .catch((e) => {
          console.log(e);
          reject(new BadRequestException('User doesnt exist'));
        });
    });
  }
}
