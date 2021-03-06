import Joi from 'joi';

// function to validate
export function validateQuestion(req) {
  const schema = Joi.object({
    text: Joi.string()
      .min(10)
      .required(),
    options: Joi.array().required(),
  });
  return schema.validate(req);
}

export function validateUrlQuery(req) {
  const schema = Joi.object({
    currentPage: Joi.number().required(),
    pageLimit: Joi.number().optional(),
    search: Joi.string().optional(),
  });
  return schema.validate(req);
}
