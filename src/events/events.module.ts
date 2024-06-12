import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './event.controller';
import { Attendee } from './attendee.entity';
import { EventsService } from './event.service';
import { AttendeesService } from './attendees.service';
import { EventsOrganizedByUsersController } from './events-organized-by-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [EventsController, EventsOrganizedByUsersController],
  providers: [EventsService, AttendeesService],
})
export class EventsModule {}
