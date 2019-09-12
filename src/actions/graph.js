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

/**
 * Returns the canvas informations
 *
 * @param {Object} canvas canvas informations
 * @param {Object} setZoom zoom init
 * @param {Object} size size of the canvas (without retina)
 *
 * @return {Object}
 */
export function getCanvas(canvas, setZoom, size) {
  return {
    type: types.GET_CANVAS,
    canvas,
    setZoom,
    size,
  };
}
