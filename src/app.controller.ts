import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkerService } from 'nestjs-graphile-worker';
import { AppService } from './app.service';
import { faker } from '@faker-js/faker';
import { MessageProducer } from './modules/sqs/producer.service';

type RequestBody = {
  queueName: string;
  withError: boolean;
};

@Controller()
export class AppController {
  constructor(
    private readonly graphileWorker: WorkerService, // private readonly messageProducer: MessageProducer,
  ) {}

  @Post()
  async addJob(@Body() body: RequestBody): Promise<void> {
    const payload = [
      { name: faker.name.fullName() },
      { name: faker.name.fullName() },
      { name: faker.name.fullName() },
      { name: faker.name.fullName() },
    ];

    if (body.withError) payload.push({ name: 'error' });

    // await this.messageProducer.sendMessage(payload);

    await this.graphileWorker.addJob('hello', payload, { maxAttempts: 1 });
  }
}
