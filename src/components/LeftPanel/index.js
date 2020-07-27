import React from 'react';
import PropTypes from 'prop-types';
import StatusLegend from './StatusLegend';
import NeighbourLevelControl from './NeighbourLevelControl';
import Filter from './Filter';
import Search from './Search';
import Hierarchy from './Hierarchy';
import styles from './index.module.scss';

import { getConfig } from '../../services/read-config';

export default function LeftPanel(props) {
  const hierarchy = getConfig('hierarchy');
  const {
    actions, groupedNodes, groupLevel, neighbourLevel, availableFilters, filters,
  } = props;

  return (
    <div className={styles.LegendContainer}>
      <Search nodes={groupedNodes} />
      <StatusLegend />
      {hierarchy && (
        <Hierarchy
          hierarchy={hierarchy}
          groupLevel={groupLevel}
          setGroupLevel={actions.setGroupLevel}
        />
      )}
      <NeighbourLevelControl
        setNeighbourLevel={actions.setNeighbourLevel}
        neighbourLevel={neighbourLevel}
      />
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

LeftPanel.propTypes = {
  actions: PropTypes.object,
  groupedNodes: PropTypes.object,
  groupLevel: PropTypes.string,
  neighbourLevel: PropTypes.number,
  availableFilters: PropTypes.object,
  filters: PropTypes.object,
};
