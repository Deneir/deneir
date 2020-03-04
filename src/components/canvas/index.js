import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import graphFunctions from './graph-functions';
import { selectNode } from '../../actions/nodes';
import graphFormatter from '../../formatters/graph-formatter';

export default function Graph(props) {
  const canvasRef = useRef(null);
  const { selectedNode, nodes } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    const actions = {
      clickNode: (nodeId) => dispatch(selectNode(nodeId)),
    };
    //  d3 setup
    const canvas = canvasRef.current;
    graphFunctions.initGraph(canvas, { data: graphFormatter(nodes), actions });
  }, [nodes, dispatch]);

  useEffect(() => {
    // select node zoom handler
    if (!selectedNode) {
      return;
    }
    graphFunctions.setCameraToNode(selectedNode);
  }, [selectedNode]);

  return <canvas id="graph" ref={canvasRef} className={styles.canvas} />;
}

Graph.propTypes = {
  nodes: PropTypes.instanceOf(Object).isRequired,
  selectedNode: PropTypes.string,
};

Graph.defaultProps = {
  selectedNode: null,
};
