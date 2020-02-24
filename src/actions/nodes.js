import * as types from '../constants/action-types';

/**
 * Returns the node id
 *
 * @param {String} nodeId string
 *
 * @return {Object}
 */
/* eslint-disable import/prefer-default-export */
export function selectNode(nodeId) {
  return {
    type: types.SELECT_NODE,
    nodeId,
  };
}
