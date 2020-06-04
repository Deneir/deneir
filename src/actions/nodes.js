import * as types from '../constants/action-types';
import callApi from '../services/api-client';
import { getConfig } from '../services/read-config';

/**
 * Returns the node id
 *
 * @param {String} nodeId string
 *
 * @return {Object}
 */
export function selectNode(nodeId) {
  return (dispatch) => {
    dispatch(readNodeDetails(nodeId));

    return dispatch({
      type: types.SELECT_NODE,
      nodeId,
    });
  };
}

/**
 * Returns the status informations
 *
 * @param {String} nodeId id of the instance
 *
 * @return {Promise}
 */
export default function readNodeDetails(nodeId) {
  const statusUrl = getConfig('detailsUrl');

  return (dispatch) => {
    dispatch({ type: types.GET_DETAILS_REQUEST });

    return callApi('GET', `${statusUrl}?instance=${nodeId}`)
      .then(({ data = [] }) => dispatch({
        type: types.GET_DETAILS_SUCCESS,
        details: data,
        nodeId,
      }))
      .catch((error) => {
        dispatch({
          type: types.GET_DETAILS_FAILURE,
          error,
        });
      });
  };
}
