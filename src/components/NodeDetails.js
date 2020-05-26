import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NodeList from './NodeList';
import styles from './NodeDetails.module.scss';

export default function PanelContainer(props) {
  const { selectedNode, actions } = props;

  return (
    <Fragment>
      <div className={styles.header}>
        <h1>{selectedNode.id}</h1>
        <button type="button" onClick={() => actions.selectNode(null)}>
          X
        </button>
      </div>
      <div className={styles.textBlock}>
        {
          Object.keys(selectedNode.tags).map((tagName) => {
            return <p key={tagName}><b>{tagName}:</b> {selectedNode.tags[tagName]}</p>;
          })
        }
      </div>
      <div>
        <NodeList
        title="Dependencies"
          selectNode={(id) => actions.selectNode(id)}
          nodes={selectedNode.dependencies}
        />
        <NodeList
        title="Dependents"
          selectNode={(id) => actions.selectNode(id)}
          nodes={selectedNode.dependents}
        />
      </div>
    </Fragment>
  );
}

PanelContainer.propTypes = {
  selectedNode: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
};
