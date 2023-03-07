import { NestFactory } from '@nestjs/core';
import { WorkerService } from 'nestjs-graphile-worker';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(WorkerService).run();
  await app.listen(3000);
}
bootstrap();
