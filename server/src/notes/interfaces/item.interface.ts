import { Document } from "mongoose";

export interface Item extends Document {
  readonly url: string;
  readonly parsedData: string[][];
}
