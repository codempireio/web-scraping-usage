import { Document } from 'mongoose';

export interface Note extends Document {
  readonly id: number;
  readonly text: string;
}
