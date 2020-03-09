import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Graph from '../components/Graph/index';
import readGraphData from '../actions/graph';
import Search from '../components/Search';
import Legend from '../components/Legend';
import * as actions from '../actions/nodes';
import { getFilteredNodes } from '../reducers/nodes-selector';

export default function GraphContainer() {
  const dispatch = useDispatch();

  const nodes = useSelector((state) => getFilteredNodes(state));
  const selectedNode = useSelector((state) => state.selectedNode);

  useEffect(() => {
    dispatch(readGraphData());
  }, [dispatch]);

  if (!Object.keys(nodes).length) {
    return <p>Loading ...</p>;
  }
  return (
    <Fragment>
      <Search nodes={nodes} onSearch={(search) => dispatch(actions.selectNode(search))} />
      <Legend />
      <Graph nodes={nodes} selectedNode={selectedNode} />
    </Fragment>
  );
}
