import * as types from '../constants/action-types';
import togglePanel from './panel';

describe('togglePanel', () => {
  it('should return an action with type TOGGLE_PANEL', () => {
    expect(togglePanel(false)).toEqual({
      type: types.TOGGLE_PANEL,
      isOpen: false,
    });
  });
});
