import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/action-types';
import readStatusData from './status';
import callApi from '../services/api-client';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../services/read-config', () => ({
  getConfig: jest.fn().mockImplementation(() => 'coucou'),
}));

jest.mock('../services/api-client');

describe('readStatusData', () => {
  it('should dispatch GET_STATUS_SUCCESS action type and payload', () => {
    callApi.mockImplementation(() => Promise.resolve('coucou'));

    const expectedActions = [
      {
        type: types.GET_STATUS_REQUEST,
      },
      {
        type: types.GET_STATUS_SUCCESS,
        payload: [],
      },
    ];

    const store = mockStore();

    return store.dispatch(readStatusData()).then(() => {
      const dispatchedActions = store.getActions();

      expect(dispatchedActions[0].type).toEqual(expectedActions[0].type);
      expect(dispatchedActions[1].type).toEqual(expectedActions[1].type);
      expect(dispatchedActions[1].payload).toEqual(expect.any(Array));
    });
  });

  it('should dispatch GET_STATUS_FAILURE action type', () => {
    callApi.mockImplementation(() => Promise.reject(new Error('some error')));

    const expectedActions = [
      {
        type: types.GET_STATUS_REQUEST,
      },
      {
        type: types.GET_STATUS_FAILURE,
      },
    ];

    const store = mockStore();

    return store.dispatch(readStatusData()).then(() => {
      const dispatchedActions = store.getActions();

      expect(dispatchedActions[0].type).toEqual(expectedActions[0].type);
      expect(dispatchedActions[1].type).toEqual(expectedActions[1].type);
    });
  });
});
