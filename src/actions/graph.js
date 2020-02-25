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

    return callApi('GET', getConfig('graphUrl'))
      .then(({ data = {} }) => {
        const nodeDictionary = smartFormatter(data.nodes, data.edges);

        return dispatch({
          type: types.GET_GRAPH_SUCCESS,
          nodes: nodeDictionary,
        });
      })
      .catch((error) => dispatch({ type: types.GET_GRAPH_FAILURE, error }));
  };
}

function smartFormatter(nodes, links) {
  const nodeDictionary = nodes.reduce(
    (prev, node) => ({
      ...prev,
      [node.id]: {
        ...node,
        dependents: [],
        dependencies: [],
      },
    }),
    {},
  );

  links.forEach((link) => {
    const { source, target, type } = link;

    nodeDictionary[source].dependencies.push({ id: target, type });
    nodeDictionary[target].dependents.push({ id: source, type });
  });

  return nodeDictionary;
}
