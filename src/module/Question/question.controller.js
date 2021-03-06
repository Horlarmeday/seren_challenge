import { validateQuestion,  validateUrlQuery } from './validations';
import QuestionService from './question.service';

class QuestionController {
  /**
   * create a new question
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with question data
   */
  static async createQuestion(req, res, next) {
    const { error } = validateQuestion(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const question = await QuestionService.createQuestionService(req.body);

      return res.status(201).json({
        message: 'Successful! question created',
        data: question,
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * get all questions
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with questions data
   */
  static async getQuestions(req, res, next) {
    const { error } = validateUrlQuery(req.query);
    if (error) return res.status(400).json(error.details[0].message);

    const {
      query: { currentPage, pageLimit },
    } = req;

    try {
      const questions = await QuestionService.getQuestionsService({ currentPage, pageLimit });

      return res.status(200).json({ message: 'Data Retrieved', data: questions });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * get all questions
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with questions data
   */
  static async getQuestionByPosition(req, res, next) {
    const { position } = req.body;

    try {
      const questions = await QuestionService.getQuestionsByPosition(position);

      return res.status(200).json({ message: 'Data Retrieved', data: questions });
    } catch (err) {
      return next(err);
    }
  }
}
export default QuestionController;
