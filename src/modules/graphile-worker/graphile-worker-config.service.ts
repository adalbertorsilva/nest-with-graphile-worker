import { ConfigService } from '@nestjs/config';
import {
  GraphileWorkerConfiguration,
  GraphileWorkerConfigurationFactory,
} from 'nestjs-graphile-worker';

export class GraphileWorkerConfigService
  implements GraphileWorkerConfigurationFactory
{
  constructor(private readonly configService: ConfigService) {}
  createSharedConfiguration(): GraphileWorkerConfiguration {
    return {
      connectionString: this.configService.get('DATABASE_CONNECTION_STRING'),
      concurrency: 5,
      noHandleSignals: false,
      pollInterval: 1000,
      maxPoolSize: 5,
    };
  }
}
