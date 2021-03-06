// import { EventEmitter } from 'events';
// import { getQuestionByPosition } from '../../Question/question.repository';
//
// const eventEmitter = new EventEmitter();


// eventEmitter.on('new_question', position => {
  // getQuestionByPosition(position).then(r => console.log(r));
  module.exports = {
    text: 'Welcome. How are you doing?',
    fallback: 'Upgrade your Slack client to use messages like these.',
    attachment_type: 'default',
    callback_id: 'response',
    actions: [
      {
        name: 'response_list',
        text: 'Select one',
        type: 'select',
        options: [
          {
            text: 'Doing Well',
            value: 'doing_well',
          },
          {
            text: 'Neutral',
            value: 'neutral',
          },
          {
            text: 'Feeling Lucky',
            value: 'feeling_lucky',
          },
        ],
      },
    ],
  };

