import * as mongoose from 'mongoose';
import { config } from 'src/service/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://${config.MONGO_DB_USER_NAME}:${config.MONGO_DB_USER_PASSWORD}@ds137661.mlab.com:37661/my-notes`,
      {useNewUrlParser: true}),
  },
];
