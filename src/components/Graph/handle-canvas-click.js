import { getConfig } from '../../services/read-config';

/**
 * Find a node from a click
 * only nodes that we have send an event
 * event.x is the same as d3.mouse
 * consistent-return is disabled because it breaks the behavior
 * if anything is returned beside undefined
 *
 * @param {Object} transform transform infos (k, x, y)
 * @param {Object} data the nodes
 * @param {Boolean} isClicked for the drag or the click
 * @return {Object} the clicked node
 */

export default function getNodeFromCanvasClick(event, transform, nodes) {
  const layerX = (event.sourceEvent && event.sourceEvent.layerX) || event.layerX;
  const layerY = (event.sourceEvent && event.sourceEvent.layerY) || event.layerY;
  const x = event ? transform.invertX(layerX) : null;
  const y = event ? transform.invertY(layerY) : null;
  const { nodes: nodesConfig } = getConfig('canvasSettings');
  const { radius } = nodesConfig;

  let dx;
  let dy;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    dx = x - node.x;
    dy = y - node.y;

    if (dx * dx + dy * dy < radius * radius) {
      return node;
    }
  }

  return undefined;
}
