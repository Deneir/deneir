/**
 * format graph for D3
 *
 * @param {Array} data data for the graph
 * @param {Number} radius radius of the nodes
 * @param {Number} fontSize font of the nodes text
 * @return {Object} nodes and links
 */

export default function graphFormatter(data, radius = 300, fontSize = 60) {
  if (data && data.nodes) {
    const newNodes = data.nodes.map((node) => ({
      ...node,
      fontSize,
      radius,
    }));
    return {
      nodes: newNodes,
      links: data.edges,
    };
  }
  return data;
}
