import { registerAs } from '@nestjs/config';

export default registerAs('graphileWorkerEnv', () => ({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
}));
