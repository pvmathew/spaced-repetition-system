import { TICK } from '../constants';

const initialState = { timeElapsed: 0 };

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case TICK:
      return {
        timeElapsed: state.timeElapsed + 1,
      };
    default:
      return state;
  }
}
