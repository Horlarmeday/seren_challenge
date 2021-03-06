import Constant from '../config/constants';
import { saveAnswer } from '../module/Answer/answer.repository';

const Agenda = require('agenda');

const agenda = new Agenda({
  db: { address: process.env.DATABASE_URL, collection: 'jobs' },
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

agenda.on('ready', () => console.log('Agenda started!'))
  .on('error', () => console.log('Agenda connection error!'));

agenda.define(Constant.SAVE_ANSWER, async job => {
  const { payload } = job.attrs.data;
  const answer = {
    question: payload.callback_id,
    answers: payload.actions[0].selected_options[0].value,
    user: {
      username: payload.user.name,
      name: payload.user.name,
      id: payload.user.id
    }
  };
  await saveAnswer(answer);
});

agenda.define(Constant.SAVE_MULTIPLE_ANSWER, async job => {
  const { payload } = job.attrs.data;

  const answer = {
    question: payload.actions[0].action_id,
    answers: payload.actions[0].selected_options.map(answer => answer.text.text),
    user: {
      username: payload.user.username,
      name: payload.user.name,
      id: payload.user.id
    }
  };
  await saveAnswer(answer);
});

agenda.start().then(r => console.log(r));

module.exports = agenda;
