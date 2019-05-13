import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema(
  {
    url: String,
    parsedData: Array,
  },
  { timestamps: true },
);
