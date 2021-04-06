import { all, fork } from 'redux-saga/effects';

import watchStartQuizSaga from './watchers/startQuiz';
import watchAnswerQuestionSaga from './watchers/answerQuestion';

export default function* root() {
  yield all([fork(watchStartQuizSaga), fork(watchAnswerQuestionSaga)]);
}
