import React from 'react';
import PropTypes from 'prop-types';
import styles from './GeneralInfoPanel.module.scss';
import { statusCodesToLabels } from '../constants/status-codes';
import NodeList from './NodeList';

export default function GeneralInfoPanel(props) {
  const { nodes, actions } = props;

  const statusCodes = Object.keys(statusCodesToLabels);
  const nodesByStatusCode = statusCodes.map((statusCode) => {
    return Object.values(nodes).filter((node) => Number(node.status) === Number(statusCode));
  });

  return (
    <div className={styles.GeneralInfoPanel}>
      {Object.keys(statusCodesToLabels).map((statusCode) => {
        const label = statusCodesToLabels[statusCode];
        const nodeCount = nodesByStatusCode[statusCode].length;
        return (
          <NodeList
            key={label}
            defaultOpen={Number(statusCode) > 0}
            title={`${label} (${nodeCount})`}
            selectNode={actions.selectNode}
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
