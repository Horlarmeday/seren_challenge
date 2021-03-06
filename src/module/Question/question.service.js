import { createQuestion, getQuestionByPosition, getQuestions } from './question.repository';

class QuestionService {
  /**
   * create a new question service
   *
   * @static
   * @returns {json} json object with user token
   * @param body object containing text and options
   */
  static async createQuestionService(body) {
    const question = await createQuestion(body);
    return question;
  }

  /**
   * get all questions
   *
   * @static
   * @returns {json} json array of objects of questions
   * @param body
   */
  static async getQuestionsService(body) {
    const { currentPage, PageLimit } = body;
    return getQuestions(currentPage, PageLimit);
  }

  /**
   * get question by position
   *
   * @static
   * @returns {json} object of one question
   * @param body
   */
  static async getQuestionsByPosition(body) {
    return getQuestionByPosition(body);
  }
}

export default QuestionService;
