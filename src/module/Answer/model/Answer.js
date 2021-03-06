import { model, Schema } from 'mongoose';

const answerSchema = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },

    user: {
      username: {
        type: String,
        required: true,
        trim: true,
      },

      name: {
        type: String,
        required: true,
      },

      id:{
        type: String,
        required: true
      }
    },

    answer: {
      type: Array,
      required: true,
    },
  },
  { timestamp: true }
);
export default model('Answer', answerSchema);
