import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import drawAll from './draw-graph';
import { onDragStart, onDrag, onDragEnd } from './drag';
import getNodeFromCanvasClick, { setProgrammaticZoom } from './handle-canvas-click';
import { getConfig } from '../../../services/read-config';
import styles from './index.module.scss';

export default function Graph(props) {
  const settings = getConfig('canvasSettings');
  const canvasRef = useRef(null);
  const { actions, selectedNode, nodes } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(graphFormatter(nodes));
  }, [nodes]);

  useEffect(() => {
    // todo handle zoom when selectedNode changes
  }, [selectedNode]);

  useEffect(() => {
    if (!canvasRef.current) {
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
    let transform = d3.zoomIdentity.translate(width / 2, height / 2).scale(settings.minimumScale);

    // Create force simulation
    const simulation = d3
      .forceSimulation()

      .force('x', d3.forceX(width / 2).strength(0.1)) // center horizontally
      .force('y', d3.forceY(height / 2).strength(0.1)) // center vertically
      .force('charge', d3.forceManyBody().strength(-1500000)) // every node pushes other nodes
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
      .nodes(data.nodes)
      .on('tick', () => {
        drawAll(context, transform, data, canvas);
      })
      .force('link')
      .links(data.links);

    // Draw / Zoom
    const setDrag = d3
      .drag()
      .subject(() => {
        const node = getNodeFromCanvasClick(transform, data.nodes);

        if (!node) {
          return undefined;
        }

        node.x = transform.applyX(node.x);
        node.y = transform.applyY(node.y);
        return node;
      })
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

    const removeZoom = d3.zoom().on('zoom', null);

    canvas.setZoom = {
      transform: setZoom.transform,
    };

    d3.select(canvas).on('click', () => {
      const node = getNodeFromCanvasClick(transform, data.nodes);

      if (node && node.id) {
        setProgrammaticZoom(canvas, node, { width, height });

        actions.clickNode(node.id);
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
  }, [actions, data, settings]);

  if (!data) {
    return null;
  }
  return <canvas id="graph" ref={canvasRef} className={styles.canvas} />;
}

Graph.propTypes = {
  actions: PropTypes.instanceOf(Object).isRequired,
  nodes: PropTypes.instanceOf(Object).isRequired,
  selectedNode: PropTypes.string,
};

Graph.defaultProps = {
  selectedNode: null,
};

export function graphFormatter(nodeDictionary) {
  const nodes = Object.values(nodeDictionary).map((node) => {
    const {
      id, type, status, tags,
    } = node;

    return {
      id,
      type,
      status,
      tags,
    };
  });
  const links = Object.values(nodeDictionary)
    .map((node) => node.dependents.map((dependent) => ({
      source: node.id,
      target: dependent.id,
      type: dependent.type,
    })))
    .flat();

  return { nodes, links };
}
