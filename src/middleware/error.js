/* eslint-disable no-unused-vars */
import winston from 'winston';
import { handleError } from '../utils/baseError';

export default function(error, req, res, next) {
  winston.error(error.message, error);
  handleError(error, res);
}
