import { all, fork } from 'redux-saga/effects';

import watchStartQuizSaga from './watchers/startQuiz';

export default function* root() {
  yield all([fork(watchStartQuizSaga)]);
}
