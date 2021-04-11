import { put, delay, takeEvery, select } from 'redux-saga/effects';
import { ANSWER_QUESTION_SAGA } from '../../constants';
import {
  popNextKey,
  incrementNumCorrect,
  incrementNumWrong,
  levelUpQuestion,
  graduateQuestion,
  reinsertQuestion,
  graduateQuestionCautiously,
  increaseGraduatedInterval,
  resetQuestionLevel,
} from '../../actions';

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
        yield put(reinsertQuestion(oldPriority + 3, key));
        break;
      case 2:
        yield put(levelUpQuestion(key));
        yield put(reinsertQuestion(oldPriority + 7, key));
        break;
      case 3: //if graduating
        if (question.hasLapsed) {
          // if user lapsed on this card before
          yield put(graduateQuestionCautiously(key));
          yield put(
            reinsertQuestion(
              oldPriority + question.currentGraduatedInterval * 0.8,
              key
            )
          );
        } else {
          yield put(graduateQuestion(key));
          yield put(
            reinsertQuestion(
              oldPriority + question.currentGraduatedInterval,
              key
            )
          );
        }
        break;
      default:
        // if already graduated
        yield put(increaseGraduatedInterval(key));
        yield put(
          reinsertQuestion(
            oldPriority +
              question.currentGraduatedInterval * question.startingEase,
            key
          )
        );
    }
  } else {
    // if question was answered incorrectly
    yield put(incrementNumWrong());
    const prevLearningLevel = question.learningLevel;
    const lapsed = prevLearningLevel >= 3;

    // reset question back to level 0 and reinsert
    yield put(resetQuestionLevel(lapsed, key));
    yield put(reinsertQuestion(oldPriority + 2, key));
  }

  // wait 3 seconds and pop next questoin
  yield delay(3000);
  yield put(popNextKey());
}

export default function* watchAnswerQuestionSaga() {
  yield takeEvery(ANSWER_QUESTION_SAGA, answerQuestionSaga);
}
