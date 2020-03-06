import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNode } from '../actions/nodes';
import { getNodeDetails } from '../reducers/nodes-selector';
import { statusCodesToLabels } from '../constants/status-codes';

import styles from './PanelContainer.module.scss';

export default function PanelContainer() {
  const dispatch = useDispatch();

  const selectedNode = useSelector((state) => {
    if (!state.selectedNode) {
      return null;
    }
    return getNodeDetails(state.nodes, state.selectedNode);
  });

  return (
    <>
      {selectedNode && (
        <section className={styles.panel}>
          <div className={styles.header}>
            <h1>{selectedNode.id}</h1>
            <button type="button" onClick={() => dispatch(selectNode(null))}>
              X
            </button>
          </div>
          <div>
            <h2>Dependencies</h2>
            <ul>
              {selectedNode.dependencies.map((dependency) => (
                <li key={dependency.id}>
                  <a onClick={() => dispatch(selectNode(dependency.id))}>
                    {dependency.id}
                    {' '}
                    ({statusCodesToLabels[dependency.status]})
                  </a>
                </li>
              ))}
            </ul>
            <h2>Dependents</h2>
            <ul>
              {selectedNode.dependents.map((dependent) => (
                <li key={dependent.id}>
                  <a onClick={() => dispatch(selectNode(dependent.id))}>
                    {dependent.id}
                    {' '}
                    ({statusCodesToLabels[dependent.status]})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
