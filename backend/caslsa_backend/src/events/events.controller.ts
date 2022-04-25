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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ForceUnsubscribeDTO } from './dto/force-unsubsribe.dto';

@ApiTags('Event')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({
    summary: 'Create an event with an age group, event group, name, and date',
  })
  @ApiBearerAuth()
  @Post('/create')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return { token: await this.eventsService.createEvent(createEventDto) };
  }

  @ApiOperation({
    summary: 'Get all events back',
  })
  @ApiBearerAuth()
  @Get('/all')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async getAllEvents() {
    const events = await this.eventsService.getEvents();
    return events;
  }

  @ApiOperation({
    summary: 'Get a specific event back',
  })
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  getEvent(@Param('id') eventId: string) {
    return this.eventsService.getEvent(eventId);
  }

  @ApiOperation({
    summary: 'Edit an event',
  })
  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async updateEvent(@Body() updateEventDto: UpdateEventDto) {
    return { id: await this.eventsService.updateEvent(updateEventDto) };
  }

  @ApiOperation({
    summary: 'Delete an event',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async removeEvent(@Param('id') eventId: string) {
    await this.eventsService.deleteEvent(eventId);
    return { success: 'Event deleted.' };
  }

  @ApiOperation({
    summary: 'Subscribe to an event',
  })
  @ApiBearerAuth()
  @Post('/subscribe/:id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async subscribe(@Req() request, @Param('id') eventId: string) {
    return await this.eventsService.subscribeToEvent(request.user, eventId);
  }

  @ApiOperation({
    summary: 'Unsubscribe to an event',
  })
  @ApiBearerAuth()
  @Post('/unsubscribe/:id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  async unsubscribe(@Req() request, @Param('id') eventId: string) {
    return await this.eventsService.unsubscribeToEvent(request.user, eventId);
  }

  @ApiOperation({
    summary: 'Unsubscribe a specific user to an event (Admin)',
  })
  @ApiBearerAuth()
  @Post('/force-unsubscribe')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async forceUnsubscribe(@Body() body: ForceUnsubscribeDTO) {
    return await this.eventsService.forceUnsubscribe(body);
  }
}
