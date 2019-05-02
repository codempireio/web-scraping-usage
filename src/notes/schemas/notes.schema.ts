import * as mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
  },
  { timestamps: true },
);
