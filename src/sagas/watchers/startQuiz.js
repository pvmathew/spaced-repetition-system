import { put, takeLatest, call, delay } from 'redux-saga/effects';
import { START_QUIZ_SAGA } from '../../constants';
import {
  setQuestions,
  initPriorityQueue,
  popNextKey,
  tick,
} from '../../actions';
import { getQuestions } from '../../lib/api';

// const passOneSecond = () => new Promise((resolve) => setTimeout(resolve, 1000));

function* startQuizTimer() {
  while (true) {
    yield delay(1000);
    yield put(tick());
  }
}

function* startQuizSaga() {
  const data = yield call(getQuestions);
  const questions = data.results;
  yield put(setQuestions(questions));
  yield put(initPriorityQueue());
  yield put(popNextKey());
  yield startQuizTimer();
}

export default function* watchStartQuizSaga() {
  yield takeLatest(START_QUIZ_SAGA, startQuizSaga);
}
