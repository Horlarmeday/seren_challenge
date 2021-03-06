import { validateUrlQuery } from '../Question/validations';
import AnswerService from './answer.service';

class AnswerController {

  /**
   * get all answers
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with answers data
   */
  static async getAnswers(req, res, next) {
    const { error } = validateUrlQuery(req.query);
    if (error) return res.status(400).json(error.details[0].message);

    const {
      query: { currentPage, pageLimit },
    } = req;

    try {
      const answers = await AnswerService.getAnswersService({ currentPage, pageLimit });

      return res.status(200).json({ message: 'Data Retrieved', data: answers });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * get a user's answers to questions
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with answers data
   */
  static async getAnswersByUser(req, res, next) {
    const { user } = req.body;

    try {
      const questions = await AnswerService.getAnswersByUser(user);

      return res.status(200).json({ message: 'Data Retrieved', data: questions });
    } catch (err) {
      return next(err);
    }
  }
}
export default AnswerController;
