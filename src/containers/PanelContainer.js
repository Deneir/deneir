import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNode } from '../actions/nodes';
import { getNodeDetails } from '../reducers/nodes-selector';
import DependencyList from '../components/DependencyList';
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
    <section className={styles.panel}>
      {selectedNode && (
        <Fragment>
          <div className={styles.header}>
            <h1>{selectedNode.id}</h1>
            <button type="button" onClick={() => dispatch(selectNode(null))}>
              X
            </button>
          </div>
          <div>
            <h2>Dependencies</h2>
            <DependencyList
              selectNode={(id) => dispatch(selectNode(id))}
              items={selectedNode.dependencies}
            />
            <h2>Dependents</h2>
            <DependencyList
              selectNode={(id) => dispatch(selectNode(id))}
              items={selectedNode.dependents}
            />
          </div>
          </Fragment>
      )}
      {!selectedNode && <div className={styles.generalInfoPanel}>
        informations générales sur le graph (hyper interessant)
      </div>}
      </section>
  );
}
