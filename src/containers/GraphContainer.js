import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Graph from '../components/canvas/index';
import readGraphData from '../actions/graph';
import Search from '../components/Search';
import Status from '../components/Status';

import styles from './GraphContainer.module.scss';

export default function GraphContainer() {
  const dispatch = useDispatch();

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
      <Graph nodes={nodes} selectedNode={selectedNode} />
    </>
  );
}
