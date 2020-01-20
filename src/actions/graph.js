import graphFormatter from './graph-formatter';
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
export default function readGraphData(radius, fontSize) {
  return (dispatch) => {
    dispatch({ type: types.GET_GRAPH_REQUEST });

    return callApi('GET', getConfig('graphUrl'))
      .then(({ data = [] }) => dispatch({
        type: types.GET_GRAPH_SUCCESS,
        payload: graphFormatter(data, radius, fontSize),
      }))
      .catch((error) => {
        dispatch({ type: types.GET_GRAPH_FAILURE, error });
      });
  };
}
