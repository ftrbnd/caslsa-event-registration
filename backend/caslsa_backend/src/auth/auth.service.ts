import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/core/enums/role.enum';
import { Event } from 'src/events/event.model';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthEmailDto } from './dto/auth-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialUpdateAccountDto } from './dto/update-account.dto';
import { UpdateRoles } from './dto/update-roles.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Event') private eventModel: Model<Event>,
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
        memberType: createUserDto.memberType,
        agencyId: createUserDto.agencyId,
        gender: createUserDto.gender,
        birthdate: createUserDto.birthdate,
        events: [],
      });
      return await newUser
        .save()
        .then(async () => {
          return await this.loginUser({
            email: createUserDto.email,
            password: createUserDto.password,
          });
        })
        .catch((e) => {
          console.log(e);
          throw new UnauthorizedException();
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
      const user = await this.userModel
        .findOne({ email: request.user })
        .select('-password');
      if (!user) throw new UnauthorizedException();
      const events = [];
      for (const e of user.events) {
        try {
          const event = await this.eventModel
            .findById(e)
            .select('ageGroup eventGroup eventName eventDate');
          events.push(event);
        } catch (e) {
          console.log(e);
        }
      }
      return { ...user.toObject({ versionKey: false }), events };
    } else {
      throw new UnauthorizedException();
    }
  }

  async getUsers() {
    return await this.userModel.find().select('-password');
  }

  async deleteUser(auth: AuthEmailDto) {
    if (!auth.email) throw new BadRequestException('Need email in body.');

    return new Promise((resolve, reject) => {
      this.userModel
        .findOneAndDelete({ email: auth.email })
        .then((r) => {
          if (r) resolve('Account deleted');
          else reject(new BadRequestException('User doesnt exist'));
        })
        .catch((e) => {
          console.log(e);
          reject(new BadRequestException('User doesnt exist'));
        });
    });
  }

  async updateRoles(user: UpdateRoles) {
    const roles = [...new Set(user.roles)]; // Remove duplicated values

    return new Promise((resolve, reject) => {
      this.userModel
        .findOneAndUpdate({ email: user.email }, { roles })
        .then((r) => {
          if (r) resolve('Account updated');
          else reject(new BadRequestException('User doesnt exist'));
        })
        .catch((e) => {
          console.log(e);
          reject(new UnauthorizedException());
        });
    });
  }

  async updateAccount(request, updatedUser: PartialUpdateAccountDto) {
    if (request.user) {
      return new Promise((resolve, reject) => {
        this.userModel
          .findOneAndUpdate({ email: request.user }, updatedUser)
          .then((r) => {
            if (r) resolve('Account updated');
            else reject(new BadRequestException('User doesnt exist'));
          })
          .catch((e) => {
            console.log(e);
            reject(new UnauthorizedException());
          });
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async deleteOwnAccount(request) {
    if (request.user) {
      return new Promise((resolve, reject) => {
        this.userModel
          .findOneAndDelete({ email: request.user })
          .then((r) => {
            if (r) resolve('Account deleted');
            else reject(new BadRequestException('User doesnt exist'));
          })
          .catch((e) => {
            console.log(e);
            throw new UnauthorizedException();
          });
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateUser(user: UpdateUserDto) {
    const email = user.email;
    delete user.email;
    return new Promise((resolve, reject) => {
      this.userModel
        .findOneAndUpdate({ email }, user)
        .then((r) => {
          if (r) resolve('User updated');
          else reject(new BadRequestException('User doesnt exist'));
        })
        .catch((e) => {
          console.log(e);
          throw new UnauthorizedException();
        });
    });
  }
}
