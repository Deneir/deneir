import * as types from '../constants/action-types';
import callApi from '../services/api-client';
import { getConfig } from '../services/read-config';

/**
 * Returns the status informations
 *
 * @param {String} nodeId id of the instance
 *
 * @return {Promise}
 */
export function readNodeDetails(nodeId) {
  const detailsUrl = getConfig('detailsUrl');

  return (dispatch) => {
    dispatch({ type: types.GET_DETAILS_REQUEST });

    return callApi('GET', `${detailsUrl}?instance=${nodeId}`)
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
