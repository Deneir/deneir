import * as types from '../constants/action-types';

export default function nodes(state = {}, action) {
  switch (action.type) {
    case types.SELECT_NODE:
      return {
        selectedNode: action.nodeId,
      };
    default:
      return state;
  }
}
