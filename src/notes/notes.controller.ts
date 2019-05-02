import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './interfaces/note.interface';
import { CreateNoteDTO } from './dto/note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  createNote(@Body() createNoteDTO: CreateNoteDTO): Promise<Note> {
    return this.notesService.createNote(createNoteDTO);
  }

  @Get()
  getNotes(): Promise<Note[]> {
    return this.notesService.getNotes();
  }
}
