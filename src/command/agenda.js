import Constant from '../config/constants';

const Agenda = require('agenda');

const agenda = new Agenda({
  db: { address: process.env.DATABASE_URL, collection: 'jobs' },
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

agenda
  .on('ready', () => console.log('Agenda started!'))
  .on('error', () => console.log('Agenda connection error!'));

agenda.define(Constant.SAVE_ANSWER, async job => {
  const { message, user } = job.attrs.data;
  await sendSMS(message, user);
});

agenda.start().then(r => console.log(r));

module.exports = agenda;
