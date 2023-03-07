import { Injectable, Logger } from '@nestjs/common';
import { Helpers, Job, JobHelpers } from 'graphile-worker';
import { Task, TaskHandler } from 'nestjs-graphile-worker';

type Payload = {
  name: string;
};

type EventArgs = {
  worker: Worker;
  job: Job;
  error: any;
};

@Injectable()
@Task('hello')
export class HelloTask {
  private logger = new Logger(HelloTask.name);

  private async handleName(name: string): Promise<string> {
    if (name === 'error') throw new Error('You shall not pass');

    return `Hello, ${name}`;
  }

  @TaskHandler()
  handler(payload: Payload[], helpers: JobHelpers): Promise<string>[] {
    return (payload as Payload[]).map((person) => {
      const { name } = person as unknown as Payload;
      this.logger.log(`Hello, ${name}`);

      return this.handleName(name);
    });
  }
}
