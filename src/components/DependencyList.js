import React from 'react';
import PropTypes from 'prop-types';
import { statusCodesToLabels } from '../constants/status-codes';
import styles from './DependencyList.module.scss';

export default function DependencyList(props) {
  const { items, selectNode } = props;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <button className={styles.dependencyLink} onClick={() => selectNode(item.id)}>
            {item.id} ({statusCodesToLabels[item.status]})
          </button>
        </li>
      ))}
    </ul>
  );
}

DependencyList.propTypes = {
  items: PropTypes.array.isRequired,
  selectNode: PropTypes.func.isRequired,
};
