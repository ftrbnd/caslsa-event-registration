import { Type } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema(
  {
    ageGroup: {
      type: String,
      required: true,
    },
    eventGroup: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    users: {
      type: [],
    },
  },
  { timestamps: true },
);

export interface Event extends mongoose.Document {
  _id: string;
  ageGroup: string;
  eventGroup: string;
  eventName: string;
  eventDate: Date;
  users: string[];
}
