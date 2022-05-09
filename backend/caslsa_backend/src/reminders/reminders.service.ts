import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/user.model';
import { Event } from 'src/events/event.model';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel('Event') private eventModel: Model<Event>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  private getEmailTemplate(name: string, eventName: string, eventDate: Date) {
    return `Hey ${name}, get ready!
    <br>
    <br>
    This is a reminder that ${eventName} is happening tomorrow!
    <br>
    ${eventDate.toLocaleString()}
    <br>
    <br>
    California Surf Lifesaving Association | https://cslsa.org/`;
  }

  private async wrappedSendMail(mailOptions, transporter) {
    return new Promise((resolve) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('error is ' + error);
          resolve(false);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(true);
        }
      });
    });
  }

  @Cron('0 0 8 * * *')
  async dailyReminders() {
    console.log('Start daily reminders job...');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const events = await this.eventModel.find();
    const today = new Date();
    for (const event of events) {
      if (
        event.eventDate.getMonth() === today.getMonth() &&
        event.eventDate.getDate() === today.getDate() + 1
      ) {
        for (const id of event.users) {
          const user = await this.userModel.findById(id);
          if (!user || !user.reminder) continue;
          const emailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Event Reminder',
            html: this.getEmailTemplate(
              user.name,
              event.eventName,
              event.eventDate,
            ),
          };
          await this.wrappedSendMail(emailOptions, transporter);
        }
      }
    }
    console.log('End of daily reminders job');
  }
}
