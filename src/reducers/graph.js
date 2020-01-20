import * as types from '../constants/action-types';

const initialState = {
  loading: true,
};

export default function graph(state = initialState, action) {
  switch (action.type) {
    case types.GET_GRAPH_REQUEST:
      return initialState;
    case types.GET_GRAPH_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case types.GET_GRAPH_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
