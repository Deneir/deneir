import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useCanvas from './use-canvas';
import readGraphData from '../../actions/graph';
import selectNode from '../../actions/nodes';
import readStatusData from '../../actions/status';
import togglePanel from '../../actions/panel';
import Search from './Search';
import Status from './Status';

import styles from './index.module.scss';

export default function GraphContainer(props) {
  const dispatch = useDispatch();

  const actions = {
    clickNode: (nodeId) => dispatch(selectNode(nodeId)),
    getStatus: (nodeId) => dispatch(readStatusData(nodeId)),
    togglePanel: () => dispatch(togglePanel(true)),
  };

  const { settings } = props;

  const graphData = useSelector((state) => state.graph);
  const canvasRef = useCanvas(settings, graphData, actions);

  useEffect(() => {
    dispatch(readGraphData(settings.radius, settings.fontSize));
  }, [canvasRef, dispatch, settings]);

  if (graphData.loading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <Search nodes={graphData.nodes} className={styles.search} canvas={canvasRef} />
      <Status className={styles.status} />
      <canvas id="graph" ref={canvasRef} className={styles.canvas} />
    </>
  );
}

GraphContainer.propTypes = {
  settings: PropTypes.shape({
    radius: PropTypes.number,
    fontSize: PropTypes.number,
  }).isRequired,
};
