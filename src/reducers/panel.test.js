import * as types from '../constants/action-types';
import panel from './panel';

describe('Panel reducer', () => {
  it('should return initial state if action is whatever', () => {
    // eslint-disable-next-line
    expect(panel(undefined, 'plop')).toEqual({});
  });

  it('should return isOpen result if action is TOGGLE_PANEL', () => {
    expect(
      panel(
        {},
        {
          type: types.TOGGLE_PANEL,
          isOpen: false,
        },
      ),
    ).toEqual({ openedPanel: false });
  });
});
