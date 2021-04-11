import { put, delay, takeEvery, select, call } from 'redux-saga/effects';
import { ANSWER_QUESTION_SAGA, ROOT_INDEX } from '../../constants';
import {
  incrementNumCorrect,
  incrementNumWrong,
  levelUpQuestion,
  graduateQuestion,
  graduateQuestionCautiously,
  increaseGraduatedInterval,
  resetQuestionLevel,
  updateQueueAfterPush,
  updateQueueAfterPop,
} from '../../actions';
import { bubbleDown } from '../../heapify';

function* pushQuestion(priority, key) {
  const queue = yield select((state) => state.queueReducer.queue);

  if (queue.length === queue.capacity) {
    throw new Error("Heap has reached capacity, can't push new items");
  }

  // using array spread to clone state
  const keys = [...queue.keys];
  const priorities = [...queue.priorities];

  // since we are only ever pushing into queue when it has a popped element, we only ever need to bubble down
  keys[ROOT_INDEX] = key;
  priorities[ROOT_INDEX] = priority;
  bubbleDown(keys, priorities, ROOT_INDEX);

  yield put(updateQueueAfterPush(keys, priorities));
}

function* popQuestion() {
  const { keys, priorities } = yield select(
    (state) => state.queueReducer.queue
  );

  const currentQuestion = {
    key: keys[ROOT_INDEX],
    priority: priorities[ROOT_INDEX],
  };

  yield put(updateQueueAfterPop(currentQuestion));
}

function* answerQuestionSaga(action) {
  const { correct, key } = action;
  const question = yield select(
    (state) => state.questionsReducer.questions[key]
  );
  const oldPriority = yield select(
    (state) => state.queueReducer.currentQuestion.priority
  );

  // adjust priority levels here before pushing card back into queue
  if (correct) {
    yield put(incrementNumCorrect());

    const newLearningLevel = question.learningLevel + 1; // card's new learning level after getting answered correctly
    switch (newLearningLevel) {
      case 1:
        yield put(levelUpQuestion(key));
        yield call(pushQuestion, oldPriority + 3, key);
        break;
      case 2:
        yield put(levelUpQuestion(key));
        yield call(pushQuestion, oldPriority + 7, key);
        break;
      case 3: //if graduating
        if (question.hasLapsed) {
          // if user lapsed on this card before
          yield put(graduateQuestionCautiously(key));
          yield call(
            pushQuestion,
            oldPriority + question.currentGraduatedInterval * 0.8,
            key
          );
        } else {
          yield put(graduateQuestion(key));
          yield call(
            pushQuestion,
            oldPriority + question.currentGraduatedInterval,
            key
          );
        }
        break;
      default:
        // if already graduated
        yield put(increaseGraduatedInterval(key));
        yield call(
          pushQuestion,
          oldPriority +
            question.currentGraduatedInterval * question.startingEase,
          key
        );
    }
  } else {
    // if question was answered incorrectly
    yield put(incrementNumWrong());
    const prevLearningLevel = question.learningLevel;
    const lapsed = prevLearningLevel >= 3;

    // reset question back to level 0 and reinsert
    yield put(resetQuestionLevel(lapsed, key));
    yield call(pushQuestion, oldPriority + 2, key);
  }

  // wait 3 seconds and pop next questoin
  yield delay(3000);
  yield call(popQuestion);
}

export default function* watchAnswerQuestionSaga() {
  yield takeEvery(ANSWER_QUESTION_SAGA, answerQuestionSaga);
}
