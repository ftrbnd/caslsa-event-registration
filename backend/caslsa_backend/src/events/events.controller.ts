import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({
    summary: 'Create an event with an age group, event group, name, and date',
  })
  @Post('/create')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return { token: await this.eventsService.createEvent(createEventDto) };
  }

  @ApiOperation({
    summary: 'Get all events back',
  })
  @Get('/all')
  async getAllEvents() {
    const events = await this.eventsService.getEvents();
    return events;
  }

  @ApiOperation({
    summary: 'Get a specific event back',
  })
  @Get(':id')
  getEvent(@Param('id') eventId: string) {
    return this.eventsService.getEvent(eventId);
  }

  @ApiOperation({
    summary: 'Edit an event',
  })
  @Patch(':id')
  async updateEvent(@Body() updateEventDto: UpdateEventDto) {
    return { token: await this.eventsService.updateEvent(updateEventDto) };
  }

  @ApiOperation({
    summary: 'Delete an event',
  })
  @Delete(':id')
  async removeEvent(@Param('id') eventId: string) {
    await this.eventsService.deleteEvent(eventId);
    return null;
  }
}
