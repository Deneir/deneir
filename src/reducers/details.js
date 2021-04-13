import * as types from '../constants/action-types';

const initialState = null;

export default function nodes(state = initialState, action) {
  switch (action.type) {
    case types.GET_DETAILS_REQUEST:
      return initialState;
    case types.GET_DETAILS_SUCCESS:
      return action.details;
    default:
      return state;
  }
}
