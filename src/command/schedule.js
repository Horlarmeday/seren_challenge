import Constant from '../config/constants';

import agenda from './agenda';

export async function saveUserAnswer(answer) {
  await agenda.schedule('in 5 seconds', Constant.SAVE_ANSWER, {
    answer
  });
}