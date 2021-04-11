import { put, takeLatest, call } from 'redux-saga/effects';
import { START_QUIZ_SAGA } from '../../constants';
import {
  setQuestions,
  initPriorityQueue,
  popNextKey,
  startTimerSaga,
} from '../../actions';
import { getQuestions } from '../../lib/api';

function* startQuizSaga() {
  const data = yield call(getQuestions);
  const questions = data.results;

  questions.forEach((question) => {
    question.learningLevel = 0; // question graduates at level 3
    question.startingEase = 2.5; // graduated interval multiplier for correct answers; decreases by 0.2 on lapse
    question.currentGraduatedInterval = 10; // starting graduated interval
    question.isGraduated = false;
    question.hasLapsed = false;
  });

  yield put(setQuestions(questions));
  yield put(initPriorityQueue());
  yield put(popNextKey());
  yield put(startTimerSaga());
}

export default function* watchStartQuizSaga() {
  yield takeLatest(START_QUIZ_SAGA, startQuizSaga);
}
