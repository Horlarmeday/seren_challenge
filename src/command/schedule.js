import Constant from '../config/constants';

import agenda from './agenda';

export async function saveUserAnswer(payload) {
  await agenda.schedule('in 5 seconds', Constant.SAVE_ANSWER, {
    payload
  });
}

export async function saveUserMultipleAnswer(payload) {
  await agenda.schedule('in 5 seconds', Constant.SAVE_MULTIPLE_ANSWER, {
    payload
  });
}


export async function saveUserInputAnswer(payload) {
  await agenda.schedule('in 5 seconds', Constant.SAVE_INPUT_ANSWER, {
    payload
  });
}