import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://admin:my-notes-admin1@ds137661.mlab.com:37661/my-notes', {useNewUrlParser: true}),
  },
];
