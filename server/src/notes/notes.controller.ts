import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './interfaces/note.interface';
import { parseBodyDTO } from './dto/parseBody.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  parseData(@Body() body: parseBodyDTO): Promise<Note> {
    return this.notesService.parseData(body);
  }

  @Get()
  getNotes(): Promise<any> {
    return this.notesService.getNotes();
  }
}
