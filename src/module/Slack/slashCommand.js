/* eslint-disable camelcase */
import { getQuestionByPosition } from '../Question/question.repository';

export default async (req, res) => {
  const { token, user_id, channel_id } = req.body;
  console.log(`Received a slash command from user ${user_id} in channel ${channel_id}`);

  if (token !== process.env.SLACK_VERIF_TOKEN) {
    console.log('Invalid token');
    return;
  }

  const question = await getQuestionByPosition(1);

  res.status(200).send({ attachments: [
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
    ]
  });
};
