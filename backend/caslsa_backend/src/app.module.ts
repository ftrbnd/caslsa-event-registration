import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@caslsa-events.yrf7k.mongodb.net/caslsa-events?retryWrites=true&w=majority`,
    ),
    AuthModule,
    EventsModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
