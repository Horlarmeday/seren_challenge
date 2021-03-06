import { createMessageAdapter } from '@slack/interactive-messages';
// import winston from 'winston';
import timeSlot from './elements/timeSlotMenu';
import daysOfTheWeek from './elements/daysOfTheWeekMenu';
import hobbies from './elements/hobbiesMenu';
import inputText from './elements/inputText.json';
import { getQuestionByPosition } from '../Question/question.repository';
import winston from 'winston';
import AnswerService from '../Answer/answer.service';
import { saveAnswer } from '../Answer/answer.repository';
import { saveUserAnswer, saveUserMultipleAnswer } from '../../command/schedule';

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

async function respondWithNumberScale(text, callbackId, respond) {
  inputText.callback_id = callbackId;
  respond({
    attachments: inputText,
    replace_original: true,
  });
}

async function respondToNumberScale(payload, respond) {
  const text = 'What are the first 3 digits on the number scale?.';
  const callbackId = 'number_scale_answer';
  respondWithNumberScale(text, callbackId, respond);

  return { text: 'Processing...' };
}

// function respondToSelectDropdown(payload, respond) {
//   let text;
//   let callbackId;
//   const selectedOption = payload.actions[0].selected_options[0].value;

//   if (payload.callback_id === 'response') {
//     switch (selectedOption) {
//       case 'doing_well':
//         text = 'When are you free this week for a walk?.';
//         callbackId = 'doing_well_answer';
//         respondWithArticleOrBookNoButton(text, callbackId, respond);
//         break;
//       case 'neutral':
//         text = 'When are you free this week for a walk?';
//         callbackId = 'neutral_answer';
//         respondWithArticleOrBookNoButton(text, callbackId, respond);
//         break;
//       case 'feeling_lucky':
//         text = 'When are you free this week for a walk?';
//         callbackId = 'feeling_lucky_answer';
//         respondWithArticleOrBookNoButton(text, callbackId, respond);
//         break;
//       default:
//         text = 'When are you free this week for a walk?';
//         callbackId = 'anti_racism_article_book';
//         respondWithArticleOrBookNoButton(text, callbackId, respond);
//         break;
//     }
//   }
//   // Return a replacement message
//   return { text: 'Processing...' };
// }

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

// slackInteractions.action({ type: 'button' }, (payload, respond) => {
//   return respondToButtons.respond(payload, respond);
// });

module.exports.listenForInteractions = listenForInteractions;
