import * as d3 from 'd3';
import drawAll from './draw-graph';
import { getConfig } from '../../services/read-config';
import getNodeFromCanvasClick from './handle-canvas-click';
import { onDragStart, onDrag, onDragEnd } from './drag';

const graphFunctions = {};

export default graphFunctions;

graphFunctions.initGraph = function initGraph(canvas, { data: { nodes, links }, actions }) {
  const settings = getConfig('canvasSettings');
  const { width, height } = canvas.getBoundingClientRect();

  /* eslint-disable no-param-reassign */
  canvas.width = width;
  canvas.height = height;

  let cameraPosition = d3.zoomIdentity
    .translate(width / 2, height / 2)
    .scale(settings.minimumScale);

  // Create force simulation
  const simulation = d3
    .forceSimulation()
    .force('x', d3.forceX(width / 2).strength(0.1)) // center horizontally
    .force('y', d3.forceY(height / 2).strength(0.1)) // center vertically
    .force('charge', d3.forceManyBody().strength(-15000)) // every node pushes other nodes
    .force(
      'link',
      d3
        .forceLink()
        .distance(2000)
        .strength(1)
        .id((d) => d.id),
    )
    .force('center', d3.forceCenter(width / 2, height / 2));

  simulation
    .nodes(nodes)
    .on('tick', () => {
      drawAll(canvas, cameraPosition, { nodes, links });
      zoomFit(canvas, cameraPosition, { nodes });
    })
    .force('link')
    .links(links);

  d3.select(canvas).on('click', () => {
    const node = getNodeFromCanvasClick(cameraPosition, nodes);

    if (node && node.id) {
      actions.clickNode(node.id);
    }
  });

  const zoom = d3
    .zoom()
    .scaleExtent([settings.minimumScale, settings.maximumScale])
    .on('zoom', () => {
      cameraPosition = d3.event.transform;
      updateGraph({ nodes, links });
    });
  const setCameraPosition = zoom.transform;
  const drag = d3
    .drag()
    .subject(() => {
      const node = getNodeFromCanvasClick(cameraPosition, nodes);

      if (!node) {
        return undefined;
      }

      node.x = cameraPosition.applyX(node.x);
      node.y = cameraPosition.applyY(node.y);
      return node;
    })
    .on('start', () => onDragStart(simulation, cameraPosition))
    .on('drag', () => onDrag(cameraPosition))
    .on('end', () => onDragEnd(simulation));

  d3.select(canvas)
    .call(drag)
    .call(zoom)
    .call(setCameraPosition, cameraPosition);

  function updateGraph(data) {
    drawAll(canvas, cameraPosition, data);
  }
  function setCameraToNode(selectedNode) {
    const { scale, duration } = settings.zoom;
    const nodeToZoom = nodes.find((a) => a.id === selectedNode);

    d3.select(canvas)
      .transition()
      .duration(duration)
      .call(
        setCameraPosition,
        d3.zoomIdentity
          .translate(canvas.width / 2, canvas.height / 2)
          .scale(scale)
          .translate(-nodeToZoom.x, -nodeToZoom.y),
      );
  }
  function zoomFit() {
    const { topLeft, bottomRight, center } = getGraphBounds();
    const paddingPercent = 0.85;
    const widthRatio = (bottomRight.x - topLeft.x) / canvas.width;
    const heightRatio = (topLeft.y - bottomRight.y) / canvas.height;
    const idealScale = paddingPercent / Math.max(widthRatio, heightRatio);

    d3.select(canvas)
      .transition()
      .duration(20)
      .call(
        setCameraPosition,
        d3.zoomIdentity
          .translate(canvas.width / 2, canvas.height / 2)
          .scale(idealScale)
          .translate(-center.x, -center.y),
      );
  }
  function getGraphBounds() {
    const nodeXs = nodes.map((node) => node.x);
    const nodeYs = nodes.map((node) => node.y);
    const topLeft = { x: Math.min(...nodeXs), y: Math.max(...nodeYs) };
    const bottomRight = { x: Math.max(...nodeXs), y: Math.min(...nodeYs) };
    return {
      topLeft,
      bottomRight,
      center: {
        x: topLeft.x + (bottomRight.x - topLeft.x) / 2,
        y: topLeft.y - (topLeft.y - bottomRight.y) / 2,
      },
    };
  }

  graphFunctions.updateGraph = updateGraph;
  graphFunctions.setCameraToNode = setCameraToNode;
};
