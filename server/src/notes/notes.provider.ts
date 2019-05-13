import { Connection } from 'mongoose';
import { NoteSchema } from './schemas/notes.schema';
import { config } from 'src/service/config';
import { ItemSchema } from './schemas/item.schema';

export const notesProvider = [
  {
    provide: 'NOTE_MODEL',
    useFactory: (connection: Connection) => connection.model('Note', NoteSchema),
    inject: [config.DATABASE_PROVIDER],
  },
  {
    provide: 'ITEM_MODEL',
    useFactory: (connection: Connection) => connection.model('Item', ItemSchema),
    inject: [config.DATABASE_PROVIDER],
  },
];
