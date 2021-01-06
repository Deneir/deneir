import * as types from '../constants/action-types';
import callApi from '../services/api-client';
import { getConfig } from '../services/read-config';

/**
 * Returns the graph informations
 * @param {Number} radius radius of the nodes
 * @param {Number} fontSize font size of the nodes text
 *
 * @return {Promise}
 */
export default function readGraphData() {
  return (dispatch) => {
    dispatch({ type: types.GET_GRAPH_REQUEST });

    callApi('GET', getConfig('graphUrl'))
      .then(({ data = {} }) => {
        // code to replace once the api uses the correct format
        return dispatch({
          type: types.GET_GRAPH_SUCCESS,
          nodes: data,
        });
      })
      .catch((error) => dispatch({ type: types.GET_GRAPH_FAILURE, error }));

    return getConfig('enablePolling') && setTimeout(() => {
      dispatch(readGraphData());
    }, getConfig('pollingInterval'));
  };
}
