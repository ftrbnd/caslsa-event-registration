import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
  import { Event } from './event.model';
  
  @Injectable()
  export class EventsService {
    constructor(
      @InjectModel('Event') private eventModel: Model<Event>,
    ) {}
  
    async createEvent(createEventDto: CreateEventDto) {
        const newEvent = new this.eventModel({
            ageGroup: createEventDto.ageGroup,
            eventGroup: createEventDto.eventGroup,
            eventName: createEventDto.eventName,
            eventDate: createEventDto.eventDate,
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
                eventDate: updatedEvent.eventDate
            })
        } catch(error) {
            throw new NotFoundException('Could not find event.');
        }
        
        return result.id as string;
    }
  
    async deleteEvent(eventId: string) {
        let result;
        try {
            result = await this.eventModel.deleteOne({ _id: eventId }).exec();
        } catch(error) {
            throw new NotFoundException('Could not find event.');
        }
    }
    
    private async findEvent(id: string): Promise<Event> {
        let event;
        try {
            event = await this.eventModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException('Could not find event.');
        }

        if (!event) {
            throw new NotFoundException('Could not find event');
        }

        return event;
    }
  }
  