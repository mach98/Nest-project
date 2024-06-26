import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAttendeeDTO } from './input/create-attendee.dto';

@Injectable()
export class AttendeesService {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
  ) {}

  public async findByEventId(eventId: number): Promise<Attendee[]> {
    return await this.attendeeRepository.find({
      where: {
        event: { id: eventId },
      },
    });
  }

  public async findOneByEventIdAndUserId(
    eventId: number,
    userId: number,
  ): Promise<Attendee | undefined> {
    return await this.attendeeRepository.findOne({
      where: {
        event: { id: eventId },
        user: { id: userId },
      },
    });
  }

  public async createOrUpdate(
    input: CreateAttendeeDTO,
    eventId: number,
    userId: number,
  ): Promise<Attendee> {
    const attendee =
      (await this.findOneByEventIdAndUserId(eventId, userId)) ?? new Attendee();

    attendee.eventId = eventId;
    attendee.userId = userId;
    attendee.answer = input.answer;
    // rest of input...

    return await this.attendeeRepository.save(attendee);
  }
}
