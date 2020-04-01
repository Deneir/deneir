import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig } from '../services/read-config';

import Graph from '../components/Graph/index';
import StatusLegend from '../components/StatusLegend';
import Filter from '../components/Filter';
import Search from '../components/Search';
import Hierarchy from '../components/Hierarchy';
import NodeDetails from '../components/NodeDetails';
import GeneralInfoPanel from '../components/GeneralInfoPanel';

import { getFilteredNodes, getNodesGroupedByTag, getNodeDetails } from '../reducers/nodes-selector';
import { getAvailableFilters } from '../reducers/filters';

import readGraphData from '../actions/graph';
import { setFilter, setGroupLevel } from '../actions/filters';
import { selectNode } from '../actions/nodes';

import styles from './App.module.scss';

function App() {
  const specialDisplay = document.location.hash === '#rpg';
  const hierarchy = getConfig('hierarchy');
  const dispatch = useDispatch();

  const groupLevel = useSelector((state) => state.groupLevel);
  const filters = useSelector((state) => state.filters);
  const nodeDictionary = useSelector((state) => state.nodes);
  const filteredNodes = useSelector((state) => getFilteredNodes(state));
  const groupedNodes = getNodesGroupedByTag(filteredNodes, groupLevel);
  const availableFilters = getAvailableFilters({ nodes: filteredNodes });
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
  };

  if (!Object.keys(nodeDictionary).length) {
    return <p>Loading ...</p>;
  }
  return (
    <div className={`${styles.app} ${specialDisplay && 'medieval'}`}>
    <div className={styles.LegendContainer}>
      <Search nodes={groupedNodes} onSearch={(search) => dispatch(selectNode(search))} />
      <StatusLegend />
      {hierarchy && (
        <Hierarchy
          hierarchy={hierarchy}
          groupLevel={groupLevel}
          setGroupLevel={(newGroupLevel) => dispatch(setGroupLevel(newGroupLevel))}
        />
      )}
      {Object.keys(availableFilters).map((filterId) => (
        <Filter
          key={filterId}
          filters={filters[filterId]}
          filterId={filterId}
          values={availableFilters[filterId]}
          onChange={actions.handleFilterChange}
        />
      ))}
    </div>
      <div className={styles.GraphContainer}>
        <Graph
          nodes={groupedNodes}
          selectedNode={selectedNode}
          groupLevel={groupLevel}
          filters={filters}
        />
      </div>
      <section className={styles.panel}>
        {selectedNode && (
          <NodeDetails selectedNode={selectedNode} actions={actions} />
        )}
        {!selectedNode && <GeneralInfoPanel nodes={groupedNodes} actions={actions} />}
        </section>
    </div>
  );
}

export default App;
