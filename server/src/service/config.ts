import * as dotenv from 'dotenv';
import * as fs from 'fs';

interface IConfig {
  [key: string]: string;
}
const secret = dotenv.parse(fs.readFileSync('.env'));
const dbURI = `mongodb://${secret.MONGO_DB_USER_NAME}:${secret.MONGO_DB_USER_PASSWORD}@ds137661.mlab.com:37661/${secret.DATABASE_NAME}`;

export const config: IConfig = {
  ...secret,
  dbURI,
};
