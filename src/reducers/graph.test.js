import * as types from '../constants/action-types';

import graph, { canvas } from './graph';

const initialState = {
  loading: true,
};

describe('graph reducer', () => {
  it('should return the initial state if action is whatever', () => {
    expect(graph(initialState, 'whatever')).toEqual(initialState);
  });

  it('initial state should use the default value if not provided', () => {
    const nothing = undefined; // eslint-disable-line no-undefined

    expect(graph(nothing, 'whatever')).toEqual(initialState);
  });

  it('should set loading status when action is GET_GRAPH_REQUEST', () => {
    expect(
      graph(
        {},
        {
          type: types.GET_GRAPH_REQUEST,
        },
      ),
    ).toEqual({
      loading: true,
    });
  });

  it('should set layout when action is GET_GRAPH_SUCCESS', () => {
    expect(
      graph(
        {},
        {
          type: types.GET_GRAPH_SUCCESS,
          payload: {
            links: [],
            nodes: [],
          },
        },
      ),
    ).toEqual({
      links: [],
      nodes: [],
      loading: false,
    });
  });
});

describe('Canvas reducer', () => {
  it('should return initial state if action is whatever', () => {
    // eslint-disable-next-line
    expect(canvas (undefined, 'plop')).toEqual({});
  });

  it('should return the canvas infos if action is GET_CANVAS', () => {
    const setZoom = () => ({});
    expect(
      canvas(
        {},
        {
          type: types.GET_CANVAS,
          canvas: {},
          initZoom: {
            transform: setZoom,
          },
          size: {
            width: 1905,
            height: 729,
          },
        },
      ),
    ).toEqual(
      {
        canvas: {},
        initZoom: {
          transform: setZoom,
        },
        size: {
          width: 1905,
          height: 729,
        },
      },
    );
  });
});
