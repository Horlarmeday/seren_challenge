import { createMessageAdapter } from '@slack/interactive-messages';
// import winston from 'winston';
import timeSlot from './elements/timeSlotMenu';
import daysOfTheWeek from './elements/daysOfTheWeekMenu';
import hobbies from './elements/hobbiesMenu';
import inputText from './elements/inputText.json';
import { getQuestionByPosition } from '../Question/question.repository';
import winston from 'winston';
import { saveUserAnswer, saveUserMultipleAnswer } from '../../command/schedule';
import { WebClient } from '@slack/web-api';

const web = new WebClient(process.env.SLACK_BOT_TOKEN);

const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

const color = '#f2c744';

function listenForInteractions(app) {
  app.use('/interactions', slackInteractions.requestListener());
}

async function respondWithTimeSlots(callbackId, respond) {
  const question = await getQuestionByPosition(2);
  timeSlot.callback_id = callbackId;
  respond({
    text: question.text,
    attachments: [
      {
        color: color,
        blocks: [
          {
            type: 'section',
            block_id: 'question_2',
            text: {
              type: 'mrkdwn',
              text: 'Select time slots',
            },
            accessory: {
              action_id: question._id,
              type: 'multi_static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select time slot',
              },
              options: question.options
            },
          },
        ],
      },
    ],
    replace_original: true,
  });
}

async function respondToTimeSlot(payload, respond) {
  // schedule save answer
   await saveUserAnswer(payload);

   const callbackId = payload.callback_id;

   await respondWithTimeSlots(callbackId, respond);

   return { text: 'Processing...' };
}

async function respondWithDaysOfTheWeek(callbackId, respond) {
  const question = await getQuestionByPosition(3);
  daysOfTheWeek.callback_id = callbackId;
  respond({
    text: question.text,
    attachments: [
      {
        color: color,
        blocks: [
          {
            type: 'section',
            block_id: 'question_3',
            text: {
              type: 'mrkdwn',
              text: 'Select days in a week',
            },
            accessory: {
              action_id: question._id,
              type: 'multi_static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select days',
              },
              options: question.options,
            },
          },
        ],
      },
    ],
    replace_original: true,
  });
}

async function respondToDaysOfTheWeek(payload, respond) {
  // schedule save answer
  await saveUserMultipleAnswer(payload);

  const callbackId = 'answer_days';

  await respondWithDaysOfTheWeek(callbackId, respond);

  return { text: 'Processing...' };
}

async function respondWithHobbies(callbackId, respond) {
  const question = await getQuestionByPosition(4);
  hobbies.callback_id = callbackId;
  respond({
    text: question.text,
    attachments: [
      {
        color: color,
        blocks: [
          {
            type: 'section',
            block_id: 'question_4',
            text: {
              type: 'mrkdwn',
              text: 'Pick hobbies',
            },
            accessory: {
              action_id: question._id,
              type: 'multi_static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select hobbies',
              },
              options: question.options,
            },
          },
        ],
      },
    ],
    replace_original: true,
  });
}

async function respondToHobbies(payload, respond) {
  // schedule save answer
  await saveUserMultipleAnswer(payload);

  const callbackId = 'hobby_answer';

  await respondWithHobbies(callbackId, respond);

  return { text: 'Processing...' };
}

async function respondWithNumberScale(callbackId, respond) {

  const question = await getQuestionByPosition(5);

  const result = await web.views.open({
    trigger_id: callbackId,
    view: {
      type: 'modal',
      callback_id: 'question_5',
      title: {
        type: 'plain_text',
        text: 'Modal title'
      },
      submit: {
        type: 'plain_text',
        text: 'Submit'
      },
      blocks: [
        {
          type: 'input',
          label: {
            type: 'plain_text',
            text: question.text,
          },
          element: {
            type: 'plain_text_input',
            action_id: question._id
          }
        }
      ]
    }
  });

  await finalResponse(result);
}

async function respondToNumberScale(payload, respond) {
  // schedule save answer
  await saveUserMultipleAnswer(payload);

  const callbackId = payload.trigger_id;

  await respondWithNumberScale(callbackId, respond);

  return { text: 'Processing...' };
}

async function finalResponse(payload, respond) {
  await saveUserAnswer(payload);
  respond({
    blocks: [
      {
        text: 'Thank you'
      }
    ]
  })
}

slackInteractions.action({ type: 'select' }, (payload, respond) => {
  return respondToTimeSlot(payload, respond);
});

// Example of handling all dialog submissions
slackInteractions.action({ blockId: 'question_2' }, (payload, respond) => {
  winston.error(payload);
  return respondToDaysOfTheWeek(payload, respond);
});

slackInteractions.action({ blockId: 'question_3' }, (payload, respond) => {
  return respondToHobbies(payload, respond);
});

slackInteractions.action({ blockId: 'question_4' }, (payload, respond) => {
  return respondToNumberScale(payload, respond);
});

slackInteractions.viewSubmission('question_5', (payload, respond) => {
  return finalResponse(payload, respond);
});

module.exports.listenForInteractions = listenForInteractions;
