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
import { tick, decreaseQuestonTime } from '../../actions';

function* startQuizTimer() {
  while (true) {
    yield delay(1000);
    yield put(tick());
  }
}

export default function* watchHandleTimerSaga() {
  const timer = yield takeLatest(START_TIMER_SAGA, startQuizTimer);

  while (yield take(TICK)) {
    const { elapsedTime, quizTime } = yield select(
      (state) => state.timerReducer
    );
    const step = quizTime / 5;

    if (elapsedTime === quizTime) {
      yield cancel(timer);
    } else if (elapsedTime % step === 0) {
      yield put(decreaseQuestonTime());
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
