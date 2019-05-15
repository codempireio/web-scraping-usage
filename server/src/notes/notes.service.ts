import { Injectable, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Model } from 'mongoose';
import { Item } from './interfaces/item.interface';
import { parseBodyDTO } from './dto/parseBody.dto';
import { parserConfig } from 'src/service/config';

@Injectable()
export class NotesService {
  constructor(
    @Inject('ITEM_MODEL')
    private readonly itemModel: Model<Item>
  ) {}

  async getNotes(): Promise<Item[]> {
    return await this.itemModel.find().exec();
  }

  private async parsePage(page, properties) {
    await page.waitForSelector(properties[0]);
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

  async parseData(body: parseBodyDTO): Promise<Item[]> {
    const { url, firstNode, properties, pageAmount, nextPageBtn } = body;
    console.log(body);
    let currentPage = 1;
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        `--window-size=${parserConfig.chromiumWidth *
          1000},${parserConfig.chromiumHeight * 1000}`,
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: parserConfig.chromiumWidth * 1000,
      height: parserConfig.chromiumHeight * 1000,
    });
    await page.goto(url);
    const items = [];
    let links = [];

    for (currentPage; currentPage <= pageAmount; currentPage++) {
      await page.waitFor(parserConfig.delay * 1000);
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
        return hrefs;
      }, firstNode);
      for (const link of links) {
        await page.click(`[href='${link}']`);
        const data = await this.parsePage(page, properties);
        items.push(data);
        await page.goBack();
      }
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight - 500);
      });
      await page.waitForSelector(nextPageBtn);
      await page.click(nextPageBtn);
    }

    const newItem = new this.itemModel({
      url,
      parsedData: items,
    });
    await newItem.save();
    return items;
  }
}
