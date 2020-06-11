import * as types from '../constants/action-types';

export default function neighbourLevel(state = 0, action) {
  switch (action.type) {
    case types.SET_NEIGHBOUR_LEVEL:
      return action.neighbourLevel;
    default:
      return state;
  }
}
