import { Injectable, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Model } from 'mongoose';
import { Item } from './interfaces/item.interface';
import { parseBodyDTO } from './dto/parseBody.dto';

@Injectable()
export class NotesService {
  constructor(
    @Inject('ITEM_MODEL')
    private readonly itemModel: Model<Item>,
  ) {}

  async getNotes(): Promise<any> {
    return await this.itemModel.find().exec();
  }

  async parseData(body: parseBodyDTO): Promise<any> {
    const { url, firstNode, properties, pageAmount, nextPageBtn } = body;
    console.log(body);
    let currentPage = 1;
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [`--window-size=${2000},${1080}`],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 2000, height: 1080 });
    await page.goto(url);
    const items = [];
    let links = [];

    for (currentPage; currentPage <= pageAmount; currentPage++) {
      console.log('-------------------------------------'); // Develop
      await page.waitFor(2000);
      await page.waitForSelector(firstNode);
      links = await page.evaluate((node: string) => {
        const hrefs = [];
        const linkElements = document.querySelectorAll(node);
        for (const link of linkElements) {
          if (link.getAttribute('target') === '_blank') {
            return;
          }
          hrefs.push(link.getAttribute('href'));
        }
        console.log(hrefs);
        return hrefs;
      }, firstNode);
      console.log(links.length, 'links'); // Develop process
      links.splice(0, 37); // TODO: delete before deployment
      console.log(links.length, 'links after splice'); // Develop process
      for (const link of links) {
        await page.click(`[href='${link}']`);
        const data = await parsePage();
        console.log(data);
        items.push(data);
        await page.goBack();
      }
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight - 500);
      });
      await page.waitForSelector(nextPageBtn);
      await page.click(nextPageBtn);
    }

    async function parsePage() {
      // await page.waitForSelector(properties[0]);
      if ((await page.$(properties[0])) === null) {
        await page.goBack();
      }
      const parsedData = await page.evaluate((properties: string[]) => {
        const parsedParams = [];
        for (const param of properties) {
          const element = document.querySelector(param);
          if (element) {
            parsedParams.push(element.innerHTML.trim());
          }
        }
        return parsedParams;
      }, properties);
      return parsedData;
    }
    const newItem = new this.itemModel({
      url,
      parsedData: items,
    });
    await newItem.save();
    console.log(items.length, 'items');
    return items;
  }
}
