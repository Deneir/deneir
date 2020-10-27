import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import LeftPanel from '../components/LeftPanel/index';
import RightPanel from '../components/RightPanel/index';
import NodePanel from '../components/NodePanel/index';
import GeneralInfoPanel from '../components/GeneralInfoPanel';
import { getFilteredNodes, getNodesGroupedByTag } from '../reducers/nodes-selector';
import { getAvailableFilters } from '../reducers/filters';

import readGraphData from '../actions/graph';
import {
  setFilter, resetFilters, setGroupLevel, setNeighbourLevel,
} from '../actions/filters';

import styles from './App.module.scss';
import { GraphWrapper } from './GraphWrapper';

export default function App() {
  const dispatch = useDispatch();
  const [isPanelOpen, setPanelOpen] = useState(true);
  const [forceRenderId, setForceRenderId] = useState(null);
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
    handleResetFilters: () => {
      dispatch(resetFilters());
    },
    setGroupLevel: (value) => dispatch(setGroupLevel(value)),
    setNeighbourLevel: (value) => dispatch(setNeighbourLevel(value)),
  };

  if (!Object.keys(nodeDictionary).length) {
    return <p>Loading ...</p>;
  }

  const handleOpenPanel = (isOpen) => {
    setPanelOpen(isOpen);
    setTimeout(() => {
      setForceRenderId(Date.now());
    }, 300);
  };

  return (
    <div className={styles.app}>
      <LeftPanel
        actions={actions}
        availableFilters={availableFilters}
        groupedNodes={groupedNodes}
        groupLevel={groupLevel}
        filters={filters}
      />
      <Switch>
        <Route path="/node/:selectedNodeId">
          <GraphWrapper
            nodes={groupedNodes}
            groupLevel={groupLevel}
            filters={filters}
            forceRenderId={forceRenderId}
            actions={actions}
            neighbourLevel={neighbourLevel}
          />
          <RightPanel handleOpenPanel={handleOpenPanel} isPanelOpen={isPanelOpen}>
            <NodePanel nodes={nodeDictionary} details={details} actions={actions} />
          </RightPanel>
        </Route>
        <Route path="/">
          <GraphWrapper
            nodes={groupedNodes}
            groupLevel={groupLevel}
            filters={filters}
            forceRenderId={forceRenderId}
            actions={actions}
            neighbourLevel={neighbourLevel}
          />
          <RightPanel handleOpenPanel={handleOpenPanel} isPanelOpen={isPanelOpen}>
            <GeneralInfoPanel nodes={nodeDictionary} details={details} actions={actions} />
          </RightPanel>
        </Route>
      </Switch>
    </div>
  );
}
