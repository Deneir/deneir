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
export default function readStatusData(nodeId) {
  const statusUrl = getConfig('statusUrl');

  return (dispatch) => {
    dispatch({ type: types.GET_STATUS_REQUEST });

    return callApi('GET', `${statusUrl}?instance=${nodeId}`)
      .then(({ data = [] }) => dispatch({
        type: types.GET_STATUS_SUCCESS,
        payload: data,
      }))
      .catch((error) => {
        dispatch({
          type: types.GET_STATUS_FAILURE,
          error,
        });
      });
  };
}
