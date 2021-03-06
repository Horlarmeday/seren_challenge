import { calculateLimitAndOffset, paginate } from '../../helpers/helper';
import Answer from './model/Answer';

/**
 * count number of users
 *
 * @static
 * @returns {json} json object with number of documents
 */
export const countDocument = async () => {
  return Answer.estimatedDocumentCount();
};

/**
 * save answer to db
 *
 * @static
 * @returns {json} json object with user data
 * @param data accept {object} containing array of answers, user object and question id
 */
export const saveAnswer = async data => {
  const { answers, user, question } = data;
  const answer = new Answer({
    question: question,
    user: {
      username: user.username,
      name: user.name,
      id: user.id
    },
    answer: answers,
  });
  await answer.save();
  return answer;
};

/**
 * get all answers
 *
 * @static
 * @returns {json} json array of objects of answers
 * @param currentPage
 * @param pageLimit
 */
export const getAnswers = async (currentPage = 1, pageLimit = 10) => {
  const { limit, offset } = calculateLimitAndOffset(currentPage, pageLimit);
  const answers = await Answer.find()
    .limit(limit)
    .skip(offset)
    .select({ __v: 0 })
    .sort('-createdAt');
  const meta = paginate(currentPage, await countDocument(), answers, pageLimit);
  return { answers, meta };
};

export const getAnswersByUser = async (user) => {
  const answer = await Answer.findOne({ 'user.id': user });
  return answer;
};
