import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import { parseBodyDTO } from './dto/parseBody.dto';
import { Item } from './interfaces/item.interface';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  parseData(@Body() body: parseBodyDTO): Promise<Item[]> {
    return this.notesService.parseData(body);
  }

  @Get()
  getNotes(): Promise<Item[]> {
    return this.notesService.getNotes();
  }
}
