import Heapify from 'heapify';
import {
  INIT_PRIORITY_QUEUE,
  NUM_QUESTIONS,
  POP_NEXT_KEY,
  REINSERT_QUESTION,
} from '../constants';

const initialState = {
  currentQuestion: { key: null, priority: null },
  queue: null,
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_PRIORITY_QUEUE: {
      const queue = new Heapify(NUM_QUESTIONS); // default number of questions = 20
      for (let i = 0; i < NUM_QUESTIONS; i++) queue.push(i, i);
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
      };
      // const currentKey = queue.pop();
      return { ...state, currentQuestion };
    }
    case REINSERT_QUESTION: {
      const { queue } = state;
      const { newPriority, key } = action;
      console.log(queue);
      queue.push(key, newPriority);
      console.log(queue);
      return { ...state, queue };
    }
    default:
      return state;
  }
}
