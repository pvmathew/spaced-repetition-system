import {
  put,
  takeLatest,
  delay,
  select,
  fork,
  take,
  cancel,
} from 'redux-saga/effects';
import { START_TIMER_SAGA, TICK } from '../../constants';
import { tick } from '../../actions';

function* startQuizTimer() {
  while (true) {
    yield delay(1000);
    yield put(tick());
  }
}

function* handleTimerSaga() {
  const timerTask = yield fork(startQuizTimer);
  // const timeElapsed = yield select((state) => state.timerReducer.timeElapsed);
  // const quizTime = yield select((state) => state.timerReducer.quizTime);

  // console.log(timeElapsed);
}

export default function* watchHandleTimerSaga() {
  const timer = yield takeLatest(START_TIMER_SAGA, startQuizTimer);

  while (yield take(TICK)) {
    const timeElapsed = yield select((state) => state.timerReducer.timeElapsed);
    const quizTime = yield select((state) => state.timerReducer.quizTime);

    if (timeElapsed === quizTime) {
      console.log('Quiz ends!');
      yield cancel(timer);
    }
  }

  // starts the task in the background
  // const timer = yield fork(startQuizTimer);

  // wait for the user stop action
  // yield take('STOP_BACKGROUND_SYNC');
  // user clicked stop. cancel the background task
  // this will cause the forked bgSync task to jump into its finally block
  // yield cancel(bgSyncTask);
}
