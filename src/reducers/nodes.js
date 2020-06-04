import * as types from '../constants/action-types';

export default function nodes(state = {}, action) {
  switch (action.type) {
    case types.GET_GRAPH_SUCCESS:
      return action.nodes;
    case types.GET_DETAILS_SUCCESS:
      return {
        ...state,
        [action.nodeId]: {
          ...state[action.nodeId],
          details: action.details,
        },
      };
    default:
      return state;
  }
}
