import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { DataSource } from 'typeorm';

const dbConfig: TypeOrmModuleOptions = {
  database: 'nest-plus-graphile-worker',
  type: 'postgres',
  entities: [path.join(__dirname, 'entities', '*.entity.ts')],
  migrations: [path.join(__dirname, 'database', 'migrations', '*.ts')],
  host: '127.0.0.1',
  logging: false,
  synchronize: false,
  port: 5432,
  password: 'postgres',
  username: 'postgres',
};

export default dbConfig;
