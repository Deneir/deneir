import * as types from '../constants/action-types';

/**
 * Returns the node id
 *
 * @param {String} nodeId string
 *
 * @return {Object}
 */

export default function selectNode(nodeId) {
  return {
    type: types.SELECT_NODE,
    nodeId,
  };
}
