import Heapify from 'heapify';
import {
  INIT_PRIORITY_QUEUE,
  NUM_QUESTIONS,
  POP_NEXT_KEY,
  REINSERT_QUESTION,
} from '../constants';

const initialState = {
  currentQuestion: { key: null, priority: null, answered: false },
  queue: null,
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_PRIORITY_QUEUE: {
      const queue = new Heapify(NUM_QUESTIONS); // default number of questions = 20
      for (let i = 0; i < NUM_QUESTIONS; i++) queue.push(i, i); // initialize heap with priority values equivalent to each question's order of appearance
      return {
        ...state,
        queue,
      };
    }
    case POP_NEXT_KEY: {
      const { queue } = state;
      const priority = queue.peekPriority();
      const key = queue.pop();
      const currentQuestion = {
        priority,
        key,
        answered: false,
      };
      return { ...state, currentQuestion };
    }
    case REINSERT_QUESTION: {
      const { queue } = state;
      const { newPriority, key } = action;
      queue.push(key, newPriority);
      return {
        ...state,
        queue,
        currentQuestion: { ...state.currentQuestion, answered: true },
      };
    }
    default:
      return state;
  }
}
