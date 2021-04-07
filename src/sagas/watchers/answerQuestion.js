import { put, delay, takeEvery } from 'redux-saga/effects';
import { ANSWER_QUESTION_SAGA } from '../../constants';
import {
  popNextKey,
  answeredCorrectly,
  answeredIncorrectly,
} from '../../actions';

function* answerQuestionSaga(action) {
  const { correct } = action;
  if (correct) {
    yield put(answeredCorrectly());
  } else {
    yield put(answeredIncorrectly());
  }

  //adjust priority levels here before pushing card back into queue

  yield delay(3000); // wait 3 seconds before getting next card
  yield put(popNextKey());
}

export default function* watchAnswerQuestionSaga() {
  yield takeEvery(ANSWER_QUESTION_SAGA, answerQuestionSaga);
}
