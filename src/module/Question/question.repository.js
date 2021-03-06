import { calculateLimitAndOffset, paginate } from '../../helpers/helper';
import Question from './model/Question';

/**
 * count number of users
 *
 * @static
 * @returns {json} json object with number of documents
 */
export const countDocument = async () => {
  return Question.estimatedDocumentCount();
};

const getNumberOfQuestions = async () => {
  return Question.countDocuments();
};

/**
 * create user data
 *
 * @static
 * @returns {json} json object with user data
 * @param data accept {object} containing text and options
 */
export const createQuestion = async data => {
  const { text, options } = data;
  const question = new Question({
    text,
    options,
    position: await getNumberOfQuestions() + 1,
  });
  await question.save();
  return question;
};

/**
 * get questions
 *
 * @static
 * @returns {json} json array of objects of questions
 * @param currentPage
 * @param pageLimit
 */
export const getQuestions = async (currentPage = 1, pageLimit = 10) => {
  const { limit, offset } = calculateLimitAndOffset(currentPage, pageLimit);
  const questions = await Question.find()
    .limit(limit)
    .skip(offset)
    .select({ __v: 0 })
    .sort('-createdAt');
  const meta = paginate(currentPage, await countDocument(), questions, pageLimit);
  return { questions, meta };
};


export const getQuestionByPosition = async (position) => {
  const question = await Question.findOne({ position });
  return question;
};
