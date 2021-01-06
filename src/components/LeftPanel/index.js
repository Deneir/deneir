import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import Search from './Search';
import Hierarchy from './Hierarchy';
import styles from './index.module.scss';
import Button from '../Button';
import logo from './deneir-logo.svg';

import { getConfig } from '../../services/read-config';

export default function LeftPanel(props) {
  const hierarchy = getConfig('hierarchy');
  const {
    actions, groupedNodes, groupLevel, availableFilters, filters,
  } = props;

  return (
    <div className={styles.LeftPanelContainer}>
      <h1 className={styles.logo}>
        <img src={logo} alt="DENEIR" />
      </h1>
      <Search nodes={groupedNodes} />
      {hierarchy && (
        <Hierarchy
          hierarchy={hierarchy}
          groupLevel={groupLevel}
          setGroupLevel={actions.setGroupLevel}
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
      {Object.keys(filters).length > 0 && (
        <div className={styles.clearFilterWrapper}>
          <Button type="button" onClick={actions.handleResetFilters}>Clear filters</Button>
        </div>
      )}
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
