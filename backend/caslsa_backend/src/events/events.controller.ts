import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

@ApiTags('Event')
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
    return { id: await this.eventsService.updateEvent(updateEventDto) };
  }

  @ApiOperation({
    summary: 'Delete an event',
  })
  @Delete(':id')
  async removeEvent(@Param('id') eventId: string) {
    await this.eventsService.deleteEvent(eventId);
    return { success: 'Event deleted.' };
  }

  @ApiOperation({
    summary: 'Subscribe to an event',
  })
  @Post('/subscribe/:id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async subscribe(@Req() request, @Param('id') eventId: string) {
    return await this.eventsService.subscribeToEvent(request.user, eventId);
  }

  @ApiOperation({
    summary: 'Unsubscribe to an event',
  })
  @Post('/unsubscribe/:id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async unsubscribe(@Req() request, @Param('id') eventId: string) {
    return await this.eventsService.unsubscribeToEvent(request.user, eventId);
  }
}
