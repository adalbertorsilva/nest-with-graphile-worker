import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageConsumer } from './consumer.service';
import { MessageProducer } from './producer.service';
// import * as AWS from 'aws-sdk';

// const config = {
//   endpoint: new AWS.Endpoint('http://localhost:9324'),
//   accessKeyId: 'na',
//   secretAccessKey: 'na',
//   region: 'REGION',
// };

// const sqs = new AWS.SQS(config);

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'test-queue',
          queueUrl: 'http://localhost:9324/000000000000/test-queue',
          region: 'REGION',
        },
      ],
      producers: [
        {
          name: 'test-queue',
          queueUrl: 'http://localhost:9324/000000000000/test-queue',
          region: 'REGION',
        },
      ],
    }),
  ],
  providers: [MessageProducer, MessageConsumer],
  exports: [MessageProducer, MessageConsumer],
})
export class SQSModule {}
