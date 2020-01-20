/**
 * format graph for D3
 *
 * @param {Array} data data for the graph
 * @param {Number} radius radius of the nodes
 * @param {Number} fontSize font of the nodes text
 * @return {Object} nodes and links
 */

export default function graphFormatter(data) {
  if (data && data.nodes) {
    const newNodes = data.nodes.map((node) => ({
      ...node,
    }));
    return {
      nodes: newNodes,
      links: data.edges,
    };
  }
  return data;
}
