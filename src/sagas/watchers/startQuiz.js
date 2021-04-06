import { put, takeLatest, call } from 'redux-saga/effects';

import { START_QUIZ_SAGA } from '../../constants';
import { setQuestions } from '../../actions';
import { getQuestions } from '../../lib/api';

function* startQuizSaga() {
  const questions = yield call(getQuestions);
  yield put(setQuestions(questions.results));
}

export default function* watchStartQuizSaga() {
  yield takeLatest(START_QUIZ_SAGA, startQuizSaga);
}
