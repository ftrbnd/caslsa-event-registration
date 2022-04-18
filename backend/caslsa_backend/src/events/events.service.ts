import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private eventModel: Model<Event>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel({
      ageGroup: createEventDto.ageGroup,
      eventGroup: createEventDto.eventGroup,
      eventName: createEventDto.eventName,
      eventDate: createEventDto.eventDate,
      users: [],
    });

    const result = await newEvent.save();
    return result.id as string;
  }

  async getEvent(eventId: string) {
    const event = await this.findEvent(eventId);
    return {
      id: event.id,
      ageGroup: event.ageGroup,
      eventGroup: event.eventGroup,
      eventName: event.eventName,
      eventDate: event.eventDate,
      users: event.users,
    };
  }

  async getEvents() {
    return this.eventModel.find();
  }

  async updateEvent(updatedEvent: UpdateEventDto) {
    let result;
    try {
      result = await this.eventModel.findOneAndUpdate({
        ageGroup: updatedEvent.ageGroup,
        eventGroup: updatedEvent.eventGroup,
        eventName: updatedEvent.eventName,
        eventDate: updatedEvent.eventDate,
      });
    } catch (error) {
      throw new NotFoundException('Could not find event.');
    }

    return result.id as string;
  }

  async deleteEvent(eventId: string) {
    try {
      await this.eventModel.deleteOne({ _id: eventId }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find event.');
    }
  }

  private async findEvent(id: string): Promise<Event> {
    let event;
    try {
      event = await this.eventModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find event.');
    }

    if (!event) {
      throw new NotFoundException('Could not find event');
    }

    return event;
  }

  public async subscribeToEvent(email: string, id: string) {
    if (!email) throw new UnauthorizedException('Bearer not found');
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException();
    const event = await this.findEvent(id);
    if (user.events.includes(event._id) || event.users.includes(user._id))
      throw new NotAcceptableException('User already subscribed');
    try {
      user.events.push(event._id);
      event.users.push(user._id);
      await user.save();
      await event.save();
      return { success: 'Subscribed.' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  public async unsubscribeToEvent(email: string, id: string) {
    if (!email) throw new UnauthorizedException('Bearer not found');
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException();
    const event = await this.findEvent(id);
    if (!user.events.includes(event._id) || !event.users.includes(user._id))
      throw new NotAcceptableException('User not subscribed');
    try {
      const eventIndex = user.events.indexOf(event._id);
      if (eventIndex > -1) {
        user.events.splice(eventIndex, 1);
        await user.save();
      }
      const userIndex = event.users.indexOf(user._id);
      if (userIndex > -1) {
        event.users.splice(userIndex, 1);
        await event.save();
      }
      return { success: 'Unsubscribed.' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
