import { Module } from '@nestjs/common';
import { GraphileWorkerModule } from 'nestjs-graphile-worker';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloTask } from './tasks/hello.task';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphileWorkerConfigService } from './modules/graphile-worker/graphile-worker-config.service';
import dbConfig from './config';
import { SQSModule } from './modules/sqs/sqs.module';

import Redis from 'ioredis';
import { getLeakyBucketRateLimiter } from 'graphile-worker-rate-limiter';

const redis: Redis = new Redis();
const rateLimiter = getLeakyBucketRateLimiter({
  redis,
  bucketTypes: {
    'hello-global': {
      capacity: 1,
      drainInterval: 30 * 1000,
      drainCount: 1,
    },
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      expandVariables: true,
    }),
    // GraphileWorkerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     new GraphileWorkerConfigService(
    //       configService,
    //     ).createSharedConfiguration(),
    // }),

    GraphileWorkerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connectionString: config.get('DATABASE_CONNECTION_STRING'),
        concurrency: 5,
        noHandleSignals: false,
        pollInterval: 1000,
        maxPoolSize: 5,
        forbiddenFlags: rateLimiter.getForbiddenFlags,
        taskList: {
          hello: HelloTask,
        },
      }),
    }),
    TypeOrmModule.forRoot(dbConfig),
    // SQSModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
