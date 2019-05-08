import { Connection } from 'mongoose';
import { NoteSchema } from './schemas/notes.schema';
import { config } from 'src/service/config';

export const notesProvider = [
  {
    provide: 'NOTE_MODEL',
    useFactory: (connection: Connection) => connection.model('Note', NoteSchema),
    inject: [config.DATABASE_PROVIDER],
  },
];
