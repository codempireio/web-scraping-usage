import { Injectable, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Model } from 'mongoose';
import { Note } from './interfaces/note.interface';
import { CreateNoteDTO } from './dto/note.dto';
import { parseBodyDTO } from './dto/parseBody.dto';

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
    return await this.noteModel.find().exec();
  }

  async parseData(body: parseBodyDTO): Promise<any> {
    const { url, firstNode, properties } = body;
    console.log(properties);
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(url);
    const items = [];
    const links = await page.evaluate((node: string) => {
      const hrefs = [];
      const linkElements = document.querySelectorAll(node);
      console.log(linkElements)
      for (let link of linkElements ) {
        hrefs.push(link.getAttribute('href'));
      }
      return hrefs;
    }, firstNode);

    for (const link of links) {
      await page.click(`[href='${link}']`);
      const data = await parsePage();
      console.log(data);
      items.push(data);
      await page.goBack();
    }
    
    async function parsePage() {
      await page.waitForSelector(properties[0]);
      const parsedData = await page.evaluate((properties: string[]) => {
        const parsedParams = [];

        // TODO: check if elements with node exist
        for (const param of properties) {
          const element = document.querySelector(param);
          parsedParams.push(element.innerHTML);
        }
        return parsedParams;
      }, properties);
      return parsedData;
    }

    return items;
  }
}
