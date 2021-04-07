import { all, fork } from 'redux-saga/effects';

import watchStartQuizSaga from './watchers/initQuiz';
import watchAnswerQuestionSaga from './watchers/answerQuestion';
import watchHandleTimerSaga from './watchers/handleTimer';

export default function* root() {
  yield all([
    fork(watchStartQuizSaga),
    fork(watchAnswerQuestionSaga),
    fork(watchHandleTimerSaga),
  ]);
}
