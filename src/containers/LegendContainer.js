import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setGroupLevel } from '../actions/filters';
import { getAvailableFilters } from '../reducers/filters';
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
  const groupLevel = useSelector((state) => state.groupLevel);
  const filters = useSelector((state) => state.filters);

  if (!Object.keys(nodes).length) {
    return null;
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
  );
}
