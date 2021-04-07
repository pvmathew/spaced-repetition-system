import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import { ANSWER_QUESTION_SAGA } from '../../constants';
import {
  popNextKey,
  answeredCorrectly,
  answeredIncorrectly,
} from '../../actions';

function* answerQuestionSaga(action) {
  const { correct } = action;
  if (correct) {
    // if question was answered correctly, adjust priority accordingly
    yield put(answeredCorrectly());
  } else {
    // if question was answered incorrectly, adjust priority accordingly
    yield put(answeredIncorrectly());
  }

  yield put(popNextKey());
}

export default function* watchAnswerQuestionSaga() {
  yield takeEvery(ANSWER_QUESTION_SAGA, answerQuestionSaga);
}
