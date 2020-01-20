import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCanvas from './canvas/index';
import readGraphData from '../../actions/graph';
import selectNode from '../../actions/nodes';
import readStatusData from '../../actions/status';
import togglePanel from '../../actions/panel';
import Search from './Search';
import Status from './Status';

import styles from './index.module.scss';

export default function GraphContainer() {
  const dispatch = useDispatch();

  const actions = {
    clickNode: (nodeId) => dispatch(selectNode(nodeId)),
    getStatus: (nodeId) => dispatch(readStatusData(nodeId)),
    togglePanel: () => dispatch(togglePanel(true)),
  };

  const graphData = useSelector((state) => state.graph);
  const canvasRef = useCanvas(graphData, actions);

  useEffect(() => {
    dispatch(readGraphData());
  }, [canvasRef, dispatch]);

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
