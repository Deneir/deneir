import * as types from '../constants/action-types';

export default function selectedNode(state = null, action) {
  switch (action.type) {
    case types.SELECT_NODE:
      return action.nodeId;
    default:
      return state;
  }
}
