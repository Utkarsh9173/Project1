import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
  ENVIRONMENT,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_READ_HOST,
  TYPEORM_USERNAME,
  TYPEORM_LOGGING
} from '../config/secret';
import path from 'path';

let dbName = TYPEORM_DATABASE;
if (ENVIRONMENT === 'test') {
  dbName = 'sg-jobportal';
}

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  entities: [path.resolve(__dirname + '/model/*.{js,ts}')],
  migrations: [__dirname + '/migration/*'],
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  multipleStatements: true,
  replication: {
    master: {
      host: TYPEORM_HOST,
      port: Number(TYPEORM_PORT),
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: dbName
    },
    slaves: [
      {
        host: TYPEORM_READ_HOST,
        port: Number(TYPEORM_PORT),
        username: TYPEORM_USERNAME,
        password: TYPEORM_PASSWORD,
        database: dbName
      }
    ]
  },
  cli: {
    migrationsDir: 'src/database/migration'
  }
};
export = connectionOptions;
