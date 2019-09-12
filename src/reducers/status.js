import * as types from '../constants/action-types';

const initialState = {
  loading: true,
};

export default function status(state = initialState, action) {
  switch (action.type) {
    case types.GET_STATUS_REQUEST:
      return {
        ...state,
        loading: initialState.loading,
      };
    case types.GET_STATUS_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case types.GET_STATUS_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
