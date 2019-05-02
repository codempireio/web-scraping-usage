import { Connection } from 'mongoose';
import { NoteSchema } from './schemas/notes.schema';

export const notesProvider = [
  {
    provide: 'NOTE_MODEL',
    useFactory: (connection: Connection) => connection.model('Note', NoteSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
