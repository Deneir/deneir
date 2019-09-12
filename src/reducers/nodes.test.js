import * as types from '../constants/action-types';
import nodes from './nodes';

describe('Nodes reducer', () => {
  it('should return initial state if action is whatever', () => {
    // eslint-disable-next-line
    expect(nodes(undefined, 'plop')).toEqual({});
  });

  it('should return the nodeId if action is SELECT_NODE', () => {
    expect(
      nodes(
        {},
        {
          type: types.SELECT_NODE,
          nodeId: 'picaros',
        },
      ),
    ).toEqual({ selectedNode: 'picaros' });
  });
});
