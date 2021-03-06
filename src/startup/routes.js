import userRoutes from '../module/User/userRoutes';
import questionRoutes from '../module/Question/question.routes';
import answerRoutes from '../module/Answer/answer.routes';
import slashCommands from '../module/Slack/slashCommand';

export default server => {
  server.use('/api/users', userRoutes);
  server.use('/api/questions', questionRoutes);
  server.use('/api/answers', answerRoutes);
  server.use(slashCommands);

  server.use((req, res, next) => {
    const apiTimeout = 18000;
    // set the timeout for all HTTP requests
    req.setTimeout(apiTimeout, () => {
      const err = new Error('Request Timeout');
      err.status = 408;
      next(err);
    });

    // set the server response timeout for all HTTP requests
    res.setTimeout(apiTimeout, () => {
      const err = new Error('Service Unavailable');
      err.status = 503;
      next(err);
    });
    next();
  });

  server.use((req, res, next) => {
    const err = res.status(404).json('Resource does not exist');
    next(err);
  });
};
