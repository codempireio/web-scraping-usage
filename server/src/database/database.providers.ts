import * as mongoose from 'mongoose';
import { config } from 'src/service/config';

export const databaseProviders = [
  {
    provide: config.DATABASE_PROVIDER,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config.dbURI,
      {useNewUrlParser: true}),
  },
];
