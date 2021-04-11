import { put, takeLatest, call } from 'redux-saga/effects';
import { START_QUIZ_SAGA } from '../../constants';
import { setQuestions, initPriorityQueue, startTimerSaga } from '../../actions';
import { getQuestions } from '../../lib/api';
import * as heapify from '../../heapify';

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

  // root index is 1, and first question is already popped
  const keys = [0];
  const priorities = [0];

  for (let i = 0; i < questions.length; i++) {
    // insert questions 1-20 into heap, starting from root index 1
    keys[i + 1] = i;
    priorities[i + 1] = i;
  }
  yield put(initPriorityQueue(keys, priorities));
  yield put(startTimerSaga());
}

export default function* watchStartQuizSaga() {
  yield takeLatest(START_QUIZ_SAGA, startQuizSaga);
}
