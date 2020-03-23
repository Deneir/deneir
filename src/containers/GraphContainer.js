import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Graph from '../components/Graph/index';
import readGraphData from '../actions/graph';
import { getFilteredNodes, getNodesGroupedByTag } from '../reducers/nodes-selector';

export default function GraphContainer() {
  const dispatch = useDispatch();

  const nodes = useSelector((state) => getFilteredNodes(state));
  const selectedNode = useSelector((state) => state.selectedNode);
  const groupLevel = useSelector((state) => state.groupLevel);
  const groupedNodes = getNodesGroupedByTag(nodes, groupLevel);

  useEffect(() => {
    dispatch(readGraphData());
  }, [dispatch]);

  if (!Object.keys(nodes).length) {
    return <p>Loading ...</p>;
  }
  return (
    <Fragment>
      <Graph nodes={groupedNodes} selectedNode={selectedNode} groupLevel={groupLevel} />
    </Fragment>
  );
}
