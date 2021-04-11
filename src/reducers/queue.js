import {
  INIT_PRIORITY_QUEUE,
  UPDATE_QUEUE_AFTER_PUSH,
  UPDATE_QUEUE_AFTER_POP,
} from '../constants';

const initialState = {
  currentQuestion: { key: null, priority: null, answered: false },
  queue: {
    keys: [],
    priorities: [],

    length: null,
    hasPoppedElement: false,
  },
};

export default function queueReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_PRIORITY_QUEUE: {
      const { keys, priorities } = action;
      const { length } = keys;
      return {
        currentQuestion: {
          key: 0,
          priority: 0,
          answered: false,
        },
        queue: {
          ...state.queue,
          keys,
          priorities,
          length: length - 1,
          hasPoppedElement: true,
        },
      };
    }

    case UPDATE_QUEUE_AFTER_PUSH: {
      const { keys, priorities } = action;
      return {
        currentQuestion: { ...state.currentQuestion, answered: true },
        queue: {
          ...state.queue,
          keys,
          priorities,
          hasPoppedElement: false,
          length: state.queue.length + 1,
        },
      };
    }

    case UPDATE_QUEUE_AFTER_POP: {
      const { currentQuestion } = action;
      return {
        queue: {
          ...state.queue,
          hasPoppedElement: true,
          length: state.queue.length - 1,
        },
        currentQuestion: { ...currentQuestion, answered: false },
      };
    }

    default:
      return state;
  }
}
