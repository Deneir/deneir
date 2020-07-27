import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Graph from '../components/Graph/index';
import LeftPanel from '../components/LeftPanel/index';
import NodePanel from '../components/NodePanel/index';
import GeneralInfoPanel from '../components/GeneralInfoPanel';

import { getFilteredNodes, getNodesGroupedByTag } from '../reducers/nodes-selector';
import { getAvailableFilters } from '../reducers/filters';

import readGraphData from '../actions/graph';
import { setFilter, setGroupLevel, setNeighbourLevel } from '../actions/filters';

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

  useEffect(() => {
    dispatch(readGraphData());
  }, [dispatch]);

  const actions = {
    handleFilterChange: (filterId, value) => {
      dispatch(setFilter(filterId, value));
    },
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
          neighbourLevel={Number(neighbourLevel)}
          filters={filters}
        />
        <Switch>
          <Route path="/node/:selectedNodeId">
            <div className={styles.GraphContainer}>
              <Graph
                nodes={groupedNodes}
                groupLevel={groupLevel}
                filters={filters}
              />
            </div>
            <section className={styles.panel}>
              <NodePanel nodes={nodeDictionary} details={details} actions={actions} />
            </section>
          </Route>
          <Route path="/">
            <div className={styles.GraphContainer}>
              <Graph
                nodes={groupedNodes}
                groupLevel={groupLevel}
                filters={filters}
              />
            </div>
            <section className={styles.panel}>
              <GeneralInfoPanel nodes={nodeDictionary} details={details} actions={actions} />
            </section>
          </Route>
        </Switch>
      </div>
  );
}

export default App;
