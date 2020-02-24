import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Graph from './canvas/index';
import readGraphData from '../../actions/graph';
import { selectNode } from '../../actions/nodes';
import readStatusData from '../../actions/status';
import Search from './Search';
import Status from './Status';

import styles from './index.module.scss';

export default function GraphContainer() {
  const dispatch = useDispatch();
  const actions = {
    clickNode: (nodeId) => dispatch(selectNode(nodeId)),
    getStatus: (nodeId) => dispatch(readStatusData(nodeId)),
    togglePanel: () => dispatch(selectNode(null)),
  };

  const nodes = useSelector((state) => state.nodes);
  const selectedNode = useSelector((state) => state.selectedNode);

  useEffect(() => {
    dispatch(readGraphData());
  }, [dispatch]);

  if (!Object.keys(nodes).length) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <Search nodes={nodes} className={styles.search} />
      <Status className={styles.status} />
      <Graph nodes={nodes} actions={actions} selectedNode={selectedNode} />
    </>
  );
}
