import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NodeList from './NodeList';
import InstanceDetails from './InstanceDetails';
import styles from './NodeDetails.module.scss';

export default function NodeDetails(props) {
  const { selectedNode, details, actions } = props;

  return (
    <Fragment>
      <div className={styles.header}>
        <h1>{selectedNode.id}</h1>
        <button type="button" onClick={() => actions.selectNode(null)}>
          X
        </button>
      </div>
      <div className={styles.textBlock}>
        {Object.keys(selectedNode.tags).map((tagName) => {
          return (
            <p key={tagName}>
              <b>{tagName}:</b> {selectedNode.tags[tagName]}
            </p>
          );
        })}
      </div>
      {details && (
        <div className={styles.textBlock}>
          <h2>details</h2>
          <AdvancedDetails details={details} />
        </div>
      )}
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

NodeDetails.propTypes = {
  selectedNode: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
  details: PropTypes.instanceOf(Object),
};

function AdvancedDetails(props) {
  const { details } = props;
  if (!Array.isArray(details)) {
    return <pre>{JSON.stringify(details, null, 2)}</pre>;
  }

  if (details.length === 0) {
    return <p>API returned 0 instances</p>;
  }

  return details.map((instance) => {
    return <InstanceDetails key={instance.id} {...instance} />;
  });
}
