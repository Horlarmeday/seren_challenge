import { createEventAdapter } from '@slack/events-api';
import { WebClient } from '@slack/web-api';
import { ErrorHandler } from '../../utils/baseError';
import responses from './elements/welcome';
import eventEmitter from './elements/welcome';
import { getQuestionByPosition } from '../Question/question.repository';

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
const web = new WebClient(process.env.SLACK_BOT_TOKEN);


async function respondToEvent(channelId) {
  try {
    const question = await getQuestionByPosition(1);

    await web.chat.postMessage({
      channel: channelId,
      text: '',
      attachments: [
        {
          text: question.text,
          fallback: 'Upgrade your Slack client to use messages like these.',
          attachment_type: 'default',
          callback_id: question._id,
          actions: [
            {
              name: 'response_list',
              text: 'Select one',
              type: 'select',
              options: question.options
            },
          ],
        }
      ],
    });
  } catch (error) {
    console.log(error)
  }
}

async function listenForEvents(app) {
  app.use('/events', slackEvents.requestListener());

  slackEvents.on('app_mention', event => {
    console.log(
      `Received an app_mention event from user ${event.user} in channel ${event.channel}`
    );
   respondToEvent(event.channel);
  });

  // All errors in listeners are caught here. If this weren't caught, the program would terminate.
  slackEvents.on('error', error => {
    console.log(`error: ${error}`);
  });
}
module.exports.listenForEvents = listenForEvents;
module.exports.respondToEvent = respondToEvent;
