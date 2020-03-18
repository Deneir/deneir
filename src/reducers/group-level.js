import * as types from '../constants/action-types';

export default function groupLevel(state = 'node', action) {
  switch (action.type) {
    case types.SET_GROUP_LEVEL:
      return action.groupLevel;
    default:
      return state;
  }
}
