import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';

@Injectable()
export class MessageConsumer {
  @SqsMessageHandler('test-queue', false)
  async handleMessage(message: AWS.SQS.Message) {
    console.log('MESSAGE --> ', message);

    const obj: any = JSON.parse(message.Body);

    console.log('OBJ --> ', obj);
  }
}
