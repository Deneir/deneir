import * as types from '../constants/action-types';
import selectNode from './nodes';

describe('selectNode', () => {
  it('should return an action with type SELECT_NODE', () => {
    expect(selectNode('picaros')).toEqual({
      type: types.SELECT_NODE,
      nodeId: 'picaros',
    });
  });
});
