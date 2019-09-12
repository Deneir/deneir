import * as types from '../constants/action-types';

export default function panel(state = {}, action) {
  switch (action.type) {
    case types.TOGGLE_PANEL:
      return {
        openedPanel: action.isOpen,
      };
    default:
      return state;
  }
}
