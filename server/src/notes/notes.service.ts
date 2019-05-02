import { Injectable, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Model } from 'mongoose';
import { Note } from './interfaces/note.interface';
import { CreateNoteDTO } from './dto/note.dto';

const targetUrl = 'https://news.ycombinator.com/';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTE_MODEL')
    private readonly noteModel: Model<Note>,
  ) {}

  async createNote(createNoteDTO: CreateNoteDTO): Promise<Note> {
    const newNote = new this.noteModel(createNoteDTO);
    return await newNote.save();
  }

  async getNotes(): Promise<Note[]> {
    await this.parseData();
    return await this.noteModel.find().exec();
  }

  async parseData(): Promise<any> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(targetUrl);

    const newsData = await page.evaluate(() => {
      const news = [];
      // get the hotel elements
      const newsElement = document.querySelectorAll('a.storyLink');
      // get the hotel data
      for (const newsEl of newsElement) {
        news.push(newsEl.innerHTML);
      }
      return news;
    });

    for (const newsEl of newsData) {
      await this.createNote({
        id: +new Date(),
        text: newsEl,
      });
    }

    return newsData;
  }
}
