import * as types from '../constants/action-types';

export default function nodes(state = {}, action) {
  switch (action.type) {
    case types.GET_GRAPH_SUCCESS:
      return action.nodes;
    default:
      return state;
  }
}
