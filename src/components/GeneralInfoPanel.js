import React from 'react';
import PropTypes from 'prop-types';
import styles from './GeneralInfoPanel.module.scss';
import { statusCodesToLabels } from '../constants/status-codes';
import NodeList from './NodeList';

export default function GeneralInfoPanel(props) {
  const { nodes } = props;

  const statusCodes = Object.keys(statusCodesToLabels);
  const nodesByStatusCode = statusCodes.map((statusCode) => {
    return Object.values(nodes).filter((node) => Number(node.status) === Number(statusCode));
  });

  return (
    <div className={styles.GeneralInfoPanel}>
      <h2>Overview</h2>
      {Object.keys(statusCodesToLabels).reverse().map((statusCode) => {
        const label = statusCodesToLabels[statusCode];

        if (nodesByStatusCode[statusCode].length === 0) {
          return null;
        }

        return (
          <NodeList
            key={label}
            defaultOpen={Number(statusCode) > 0}
            title={label}
            nodes={nodesByStatusCode[statusCode]}
          />
        );
      })}
    </div>
  );
}

GeneralInfoPanel.propTypes = {
  nodes: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
};
