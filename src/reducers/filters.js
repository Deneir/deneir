import * as types from '../constants/action-types';

export default function nodes(state = {}, action) {
  switch (action.type) {
    case types.SET_FILTER:
      return { ...state, [action.filter]: action.value };
    default:
      return state;
  }
}
