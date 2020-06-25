import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Graph from '../components/Graph/index';
import LeftPanel from '../components/LeftPanel/index';
import NodePanel from '../components/NodePanel/index';
import GeneralInfoPanel from '../components/GeneralInfoPanel';

import { getFilteredNodes, getNodesGroupedByTag, getNodeDetails } from '../reducers/nodes-selector';
import { getAvailableFilters } from '../reducers/filters';

import readGraphData from '../actions/graph';
import { setFilter, setGroupLevel, setNeighbourLevel } from '../actions/filters';
import { selectNode } from '../actions/nodes';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  const groupLevel = useSelector((state) => state.groupLevel);
  const neighbourLevel = useSelector((state) => state.neighbourLevel);
  const filters = useSelector((state) => state.filters);
  const nodeDictionary = useSelector((state) => state.nodes);
  const details = useSelector((state) => state.details);
  const filteredNodes = useSelector((state) => getFilteredNodes(state, neighbourLevel));
  const groupedNodes = getNodesGroupedByTag(filteredNodes, groupLevel);
  const availableFilters = getAvailableFilters({ nodes: nodeDictionary });
  const selectedNodeId = useSelector((state) => {
    if (!state.selectedNode) {
      return null;
    }
    return state.selectedNode;
  });
  const selectedNode = useSelector((state) => {
    if (!state.selectedNode) {
      return null;
    }
    return getNodeDetails(state.nodes, state.selectedNode);
  });

  useEffect(() => {
    dispatch(readGraphData());
  }, [dispatch]);

  const actions = {
    handleFilterChange: (filterId, value) => {
      dispatch(setFilter(filterId, value));
    },
    selectNode: (id) => dispatch(selectNode(id)),
    setGroupLevel: (value) => dispatch(setGroupLevel(value)),
    setNeighbourLevel: (value) => dispatch(setNeighbourLevel(value)),
  };

  if (!Object.keys(nodeDictionary).length) {
    return <p>Loading ...</p>;
  }
  return (
    <div className={`${styles.app}`}>
      <LeftPanel
        actions={actions}
        availableFilters={availableFilters}
        groupedNodes={groupedNodes}
        groupLevel={groupLevel}
        neighbourLevel={neighbourLevel}
        filters={filters}
      />
      <div className={styles.GraphContainer}>
        <Graph
          nodes={groupedNodes}
          selectedNode={selectedNodeId}
          groupLevel={groupLevel}
          filters={filters}
        />
      </div>
      <section className={styles.panel}>
        {selectedNodeId && (
          <NodePanel selectedNode={selectedNode} details={details} actions={actions} />
        )}
        {!selectedNodeId && <GeneralInfoPanel nodes={groupedNodes} actions={actions} />}
      </section>
    </div>
  );
}

export default App;
