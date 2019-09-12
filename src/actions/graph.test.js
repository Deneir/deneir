import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/action-types';
import readGraphData, { getCanvas } from './graph';
import callApi from '../services/api-client';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../services/read-config', () => ({
  getConfig: jest.fn().mockImplementation(() => 'coucou'),
}));

jest.mock('../services/api-client');

describe('readGraphData', () => {
  it('should dispatch GET_GRAPH_SUCCESS action type and payload', () => {
    callApi.mockImplementation(() => Promise.resolve('coucou'));

    const expectedActions = [
      {
        type: types.GET_GRAPH_REQUEST,
      },
      {
        type: types.GET_GRAPH_SUCCESS,
        payload: [],
      },
    ];

    const store = mockStore();

    return store.dispatch(readGraphData()).then(() => {
      const dispatchedActions = store.getActions();

      expect(dispatchedActions[0].type).toEqual(expectedActions[0].type);
      expect(dispatchedActions[1].type).toEqual(expectedActions[1].type);
      expect(dispatchedActions[1].payload).toEqual(expect.any(Object));
    });
  });

  it('should dispatch GET_GRAPH_FAILURE action type', () => {
    callApi.mockImplementation(() => Promise.reject(new Error('some error')));

    const expectedActions = [
      {
        type: types.GET_GRAPH_REQUEST,
      },
      {
        type: types.GET_GRAPH_FAILURE,
      },
    ];

    const store = mockStore();

    return store.dispatch(readGraphData()).then(() => {
      const dispatchedActions = store.getActions();

      expect(dispatchedActions[0].type).toEqual(expectedActions[0].type);
      expect(dispatchedActions[1].type).toEqual(expectedActions[1].type);
    });
  });
});

describe('getCanvas', () => {
  it('should return an action with type GET_CANVAS', () => {
    const setZoom = () => ({});

    expect(
      getCanvas(
        {},
        {
          transform: setZoom,
        },
        {
          width: 1905,
          height: 729,
        },
      ),
    ).toEqual({
      type: types.GET_CANVAS,
      canvas: {},
      setZoom: {
        transform: setZoom,
      },
      size: {
        width: 1905,
        height: 729,
      },
    });
  });
});
