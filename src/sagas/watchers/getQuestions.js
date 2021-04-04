import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_QUESTIONS_SAGA } from '../../constants';
import { setQuestions } from '../../actions';
import { getQuestions } from '../../lib/api';

function* workerGetQuestionsSaga() {
  const questions = yield call(getQuestions);
  yield put(setQuestions(questions.results));
}

export default function* watchGetQuestionsSaga() {
  yield takeLatest(GET_QUESTIONS_SAGA, workerGetQuestionsSaga);
}
