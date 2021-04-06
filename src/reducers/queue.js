import Heapify from 'heapify';
import {
  ANSWERED_CORRECTLY,
  INIT_PRIORITY_QUEUE,
  NUM_QUESTIONS,
  POP_NEXT_KEY,
} from '../constants';

const initialState = { currentKey: null, queue: null };

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_PRIORITY_QUEUE: {
      const queue = new Heapify(NUM_QUESTIONS); // default number of questions = 20
      for (let i = 0; i < NUM_QUESTIONS; i++) queue.push(i);
      return {
        ...state,
        queue,
      };
    }
    case POP_NEXT_KEY: {
      const { queue } = state;
      const currentKey = queue.pop();
      return { queue, currentKey };
    }
    case ANSWERED_CORRECTLY: {
      const { queue, currentKey } = state;
      queue.push(currentKey, 30);
      return { ...state, queue };
    }
    default:
      return state;
  }
}
