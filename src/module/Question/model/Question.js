import { model, Schema } from 'mongoose';

const questionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 10,
    },

    position: {
      type: Number,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },
  },
  { timestamp: true }
);
export default model('Question', questionSchema);
