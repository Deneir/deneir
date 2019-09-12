import * as types from '../constants/action-types';

/**
 * Returns the panel state
 *
 * @param {Boolean} isOpen allows to know if panel is open or not
 *
 * @return {Object}
 */

export default function togglePanel(isOpen) {
  return {
    type: types.TOGGLE_PANEL,
    isOpen,
  };
}
