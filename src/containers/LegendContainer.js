import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setGroupLevel } from '../actions/filters';
import { getAvailableFilters } from '../reducers/filters';
import { getNodesGroupedByTag } from '../reducers/nodes-selector';
import StatusLegend from '../components/StatusLegend';
import Filter from '../components/Filter';
import { selectNode } from '../actions/nodes';
import Search from '../components/Search';
import styles from './LegendContainer.module.scss';
import Hierarchy from '../components/Hierarchy';
import { getConfig } from '../services/read-config';

export default function GraphContainer() {
  const hierarchy = getConfig('hierarchy');
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes);
  const availableFilters = getAvailableFilters({ nodes });
  const selectedNode = useSelector((state) => state.selectedNode);
  const groupedNodes = getNodesGroupedByTag(nodes, 'order');

  if (!Object.keys(nodes).length) {
    return <p>Loading ...</p>;
  }

  const actions = {
    handleFilterChange: (filterId, value) => {
      dispatch(setFilter(filterId, value));
    },
  };
  return (
    <div className={styles.LegendContainer}>
      <Search nodes={nodes} onSearch={(search) => dispatch(selectNode(search))} />
      <StatusLegend />
      {hierarchy && (
        <Hierarchy
          hierarchy={hierarchy}
          setGroupLevel={(groupLevel) => dispatch(setGroupLevel(groupLevel))}
        />
      )}
      {Object.keys(availableFilters).map((filterId) => (
        <Filter
          key={filterId}
          filterId={filterId}
          values={availableFilters[filterId]}
          onChange={actions.handleFilterChange}
        />
      ))}
    </div>
  );
}
