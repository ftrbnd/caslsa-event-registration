import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../core/enums/role.enum';
import { MemberType } from 'src/core/enums/member-type.enum';
import { Gender } from 'src/core/enums/gender.enum';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [],
      default: [Role.User],
    },
    gender: {
      type: String,
      enum: Gender,
    },
    birthdate: {
      type: Date,
    },
    memberType: {
      type: String,
      enum: MemberType,
    },
    agencyId: {
      type: Number,
    },
    reminder: {
      type: Boolean,
      default: false,
    },
    events: {
      type: [],
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', function (next) {
  const user = this as any;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function (password, callback) {
  const user = this as any;
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

export interface User extends mongoose.Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  roles: Role[];
  gender: Gender;
  birthdate: Date;
  memberType: MemberType;
  agencyId: number;
  reminder: boolean;
  events: string[];
}
