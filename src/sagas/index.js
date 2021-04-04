import { all, fork } from 'redux-saga/effects';

import watchGetQuestionsSaga from './watchers/getQuestions';

export default function* root() {
  yield all([fork(watchGetQuestionsSaga)]);
}
