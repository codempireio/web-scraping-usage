import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { DatabaseModule } from 'src/database/database.module';
import { notesProvider } from './notes.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [NotesService, ...notesProvider],
})
export class NotesModule {}
