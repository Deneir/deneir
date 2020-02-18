import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import drawAll from './draw-graph';
import {
  onDragStart, onDrag, onDragEnd,
} from './drag';
import getNodeFromCanvasClick, { setProgrammaticZoom } from './handle-canvas-click';
import { getConfig } from '../../../services/read-config';

export default function useCanvas(data, actions) {
  const settings = getConfig('canvasSettings');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data.nodes) {
      return;
    }

    // Setup canvas
    const canvas = canvasRef.current;
    const { width } = canvas.getBoundingClientRect();
    const height = window.innerHeight;
    const context = canvas.getContext('2d');

    // Ensure it isn't blurry for retina display
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Initial zoom
    let transform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(settings.minimumScale);

    // Create force simulation
    const simulation = d3
      .forceSimulation()
      .alphaTarget(0)
      .alphaDecay(0.05)
      .force('x', d3.forceX(width / 2).strength(0.1))
      .force('y', d3.forceY(height / 2).strength(0.1))
      .force('charge', d3.forceManyBody().strength(-3000000))
      .force('link',
        d3
          .forceLink()
          .distance(200)
          .strength(1)
          .id((d) => d.id))
      .force('center', d3.forceCenter(width / 2, height / 2));

    simulation
      .nodes(data.nodes)
      .on('tick', () => {
        drawAll(context, transform, data, canvas);
      })
      .force('link').links(data.links);

    // Draw / Zoom
    const setDrag = d3
      .drag()
      .subject(() => getNodeFromCanvasClick(transform, data.nodes))
      .on('start', () => onDragStart(simulation, transform))
      .on('drag', () => onDrag(transform))
      .on('end', () => onDragEnd(simulation));

    const setZoom = d3
      .zoom()
      .scaleExtent([settings.minimumScale, settings.maximumScale])
      .on('zoom', () => {
        transform = d3.event.transform;

        drawAll(context, transform, data, canvas, settings);
      });

    const removeDrag = d3
      .drag()
      .on('start', null)
      .on('drag', null)
      .on('end', null);

    const removeZoom = d3
      .zoom()
      .on('zoom', null);

    canvas.setZoom = {
      transform: setZoom.transform,
    };

    d3.select(canvas)
      .on('click', () => {
        const node = getNodeFromCanvasClick(transform, data.nodes, true);

        if (node && node.id) {
          setProgrammaticZoom(canvas, node, { width, height });

          actions.clickNode(node.id);
          actions.getStatus(node.id);
          actions.togglePanel();
        }
      });

    d3.select(canvas)
      .call(setDrag)
      .call(setZoom) // apply the zoom transformation
      .call(setZoom.transform, transform); // set the current zoom transform of the selected element

    // eslint-disable-next-line consistent-return
    return () => {
      d3.select(canvas)
        .call(removeDrag)
        .call(removeZoom);
    };
  }, [data, settings, actions]);

  return canvasRef;
}
