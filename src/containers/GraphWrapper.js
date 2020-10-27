import React from 'react';
import PropTypes from 'prop-types';
import Graph from '../components/Graph';
import LegendOverlay from '../components/LegendOverlay';
import styles from './GraphWrapper.module.scss';

export function GraphWrapper(props) {
  const {
    nodes, groupLevel, filters, forceRenderId, actions, neighbourLevel,
  } = props;
  return <div className={styles.GraphContainer}>
          <Graph
            nodes={nodes}
            groupLevel={groupLevel}
            filters={filters}
            forceRenderId={forceRenderId}
          />
          {Object.keys(nodes).length === 0
          && (<div className={styles.warningMessageFilters}>
                <p>No results, too many filters applied</p>
              </div>)}
          <LegendOverlay actions={actions} neighbourLevel={Number(neighbourLevel)} />
          </div>;
}

GraphWrapper.propTypes = {
  nodes: PropTypes.instanceOf(Object).isRequired,
  filters: PropTypes.instanceOf(Object),
  groupLevel: PropTypes.string,
  forceRenderId: PropTypes.number,
  neighbourLevel: PropTypes.number,
  actions: PropTypes.shape({
    handleFilterChange: PropTypes.func,
    setGroupLevel: PropTypes.func,
    setNeighbourLevel: PropTypes.func,
  }),
};
