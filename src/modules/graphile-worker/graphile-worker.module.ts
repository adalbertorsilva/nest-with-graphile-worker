import { Module } from '@nestjs/common';
import {
  ConfigModule as ConfigModuleNest,
  ConfigService,
} from '@nestjs/config';
import { GraphileWorkerConfigService } from './graphile-worker-config.service';

@Module({
  exports: [GraphileWorkerConfigService],
  imports: [
    ConfigModuleNest.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      expandVariables: true,
    }),
  ],
  providers: [GraphileWorkerConfigService, ConfigService],
})
export class GraphileWorkerModule {}
