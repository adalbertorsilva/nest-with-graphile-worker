import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { faker } from '@faker-js/faker';

@Injectable()
export class MessageProducer {
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage(body: any) {
    console.log('PRODUCER --> ', body);
    const message: any = JSON.stringify(body);

    try {
      await this.sqsService.send('test-queue', {
        id: faker.datatype.uuid(),
        body,
      });
      console.log('--- CHEGA AQUI ---');
    } catch (error) {
      console.log('error in producing image!', error);
    }
  }
}
