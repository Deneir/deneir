import * as types from '../constants/action-types';

import status from './status';

const initialState = {
  loading: true,
};

describe('status reducer', () => {
  it('should return the initial state if action is whatever', () => {
    expect(status(initialState, 'whatever')).toEqual(initialState);
  });

  it('initial state should use the default value if not provided', () => {
    const nothing = undefined; // eslint-disable-line no-undefined

    expect(status(nothing, 'whatever')).toEqual(initialState);
  });

  it('should set loading status when action is GET_STATUS_REQUEST', () => {
    expect(
      status(
        {},
        {
          type: types.GET_STATUS_REQUEST,
        },
      ),
    ).toEqual({
      loading: true,
    });
  });

  it('should set layout when action is GET_STATUS_SUCCESS', () => {
    expect(
      status(
        {},
        {
          type: types.GET_STATUS_SUCCESS,
          payload: {},
        },
      ),
    ).toEqual({
      loading: false,
    });
  });
});
