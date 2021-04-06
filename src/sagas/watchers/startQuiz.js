import { put, takeLatest, call } from 'redux-saga/effects';
import { START_QUIZ_SAGA } from '../../constants';
import { setQuestions, initPriorityQueue, popNextKey } from '../../actions';
import { getQuestions } from '../../lib/api';

function* startQuizSaga() {
  const data = yield call(getQuestions);
  const questions = data.results;
  yield put(setQuestions(questions));
  yield put(initPriorityQueue());
  yield put(popNextKey());
}

export default function* watchStartQuizSaga() {
  yield takeLatest(START_QUIZ_SAGA, startQuizSaga);
}
