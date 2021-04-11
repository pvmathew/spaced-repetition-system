import {
  SET_QUESTIONS,
  SET_QUIZ_TIME,
  TICK,
  START_QUIZ_SAGA,
  START_TIMER_SAGA,
  INIT_PRIORITY_QUEUE,
  POP_NEXT_KEY,
  ANSWER_QUESTION_SAGA,
  DECREASE_QUESTION_TIME,
  LEVEL_UP_QUESTION,
  GRADUATE_QUESTION,
  INCREMENT_NUM_CORRECT,
  INCREMENT_NUM_WRONG,
  REINSERT_QUESTION,
  GRADUATE_QUESTION_CAUTIOUSLY,
  INCREASE_GRADUATED_INTERVAL,
  RESET_QUESTION_LEVEL,
} from '../constants';

export function setQuizTime(time) {
  return { type: SET_QUIZ_TIME, time };
}

export function tick() {
  return { type: TICK };
}

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions,
  };
}

export function initPriorityQueue() {
  return {
    type: INIT_PRIORITY_QUEUE,
  };
}

export function popNextKey() {
  return {
    type: POP_NEXT_KEY,
  };
}

export function incrementNumCorrect() {
  return {
    type: INCREMENT_NUM_CORRECT,
  };
}

export function incrementNumWrong() {
  return {
    type: INCREMENT_NUM_WRONG,
  };
}

export function decreaseQuestonTime() {
  return {
    type: DECREASE_QUESTION_TIME,
  };
}

export function levelUpQuestion(key) {
  return {
    type: LEVEL_UP_QUESTION,
    key,
  };
}

export function graduateQuestion(key) {
  return {
    type: GRADUATE_QUESTION,
    key,
  };
}

export function reinsertQuestion(newPriority, key) {
  return {
    type: REINSERT_QUESTION,
    newPriority,
    key,
  };
}

export function graduateQuestionCautiously(key) {
  return {
    type: GRADUATE_QUESTION_CAUTIOUSLY,
    key,
  };
}

export function increaseGraduatedInterval(key) {
  return {
    type: INCREASE_GRADUATED_INTERVAL,
    key,
  };
}

export function resetQuestionLevel(lapsed, key) {
  return {
    type: RESET_QUESTION_LEVEL,
    lapsed,
    key,
  };
}

// Saga
export function startQuizSaga() {
  return { type: START_QUIZ_SAGA };
}

export function startTimerSaga() {
  return { type: START_TIMER_SAGA };
}

export function answerQuestionSaga(correct, key) {
  return { type: ANSWER_QUESTION_SAGA, correct, key };
}
