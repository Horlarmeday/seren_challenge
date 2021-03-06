import { getAnswers, getAnswersByUser, saveAnswer } from './answer.repository';

class AnswerService {
  /**
   * save an answer to a question
   *
   * @static
   * @returns {json} json object with user token
   * @param body object containing answer array and question id
   */
  static async saveAnswerService(body) {
    const answer = await saveAnswer(body);
    return answer;
  }

  /**
   * get all answers
   *
   * @static
   * @returns {json} json array of objects of answers
   * @param body
   */
  static async getAnswersService(body) {
    const { currentPage, PageLimit } = body;
    return getAnswers(currentPage, PageLimit);
  }

  /**
   * get answers to a user questions
   *
   * @static
   * @returns {json} object of all user answers
   * @param body
   */
  static async getAnswersByUser(body) {
    return getAnswersByUser(body);
  }
}

export default AnswerService;
