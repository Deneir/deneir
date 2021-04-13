import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import NodeList from '../NodeList';
import styles from './index.module.scss';
import AdvancedDetails from './AdvancedDetails';
import { getConfig } from '../../services/read-config';
import { readNodeDetails } from '../../actions/nodes';
import { addFilter } from '../../actions/filters';
import Button, { ButtonLink } from '../Button';

export default function NodeDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { nodes, details } = props;
  const { selectedNodeId } = useParams();
  const selectedNode = nodes[selectedNodeId];

  useEffect(() => {
    const detailsUrl = getConfig('detailsUrl');

    if (detailsUrl) {
      dispatch(readNodeDetails(selectedNodeId));
    }
  }, [dispatch, selectedNodeId]);

  return (
    <Fragment>
      <div className={styles.panelControls}>
        <Button type="button" onClick={history.goBack} title="go back to previously selected node">
          <FontAwesomeIcon icon={faCaretLeft} /> Back
        </Button>
        <ButtonLink type="button" to="/" title={`deselect ${selectedNode.id}`}>
          Clear
        </ButtonLink>
      </div>
      <h2>{selectedNode.id}</h2>
      {Boolean(Object.keys(selectedNode.tags).length) && (
        <div className={styles.tagsBlock}>
          {Object.keys(selectedNode.tags).map((tagName) => {
            return (
              <p key={tagName}>
                <span className={styles.tagName}>{tagName}</span>{' '}
                {selectedNode.tags[tagName].map((tag) => {
                  return (
                    <button
                      className={styles.tagButton}
                      onClick={() => dispatch(addFilter(tagName, tag))}
                      key={tag}
                      title={`add "${tag}" to the "${tagName}" filter `}
                    >
                      {tag}
                    </button>
                  );
                })}
              </p>
            );
          })}
        </div>
      )}
      {details && <AdvancedDetails details={details} />}
      <div>
        <NodeList
          title="Dependencies"
          nodes={selectedNode.dependencies.map((n) => ({ ...n, status: nodes[n.id].status }))}
        />
        <NodeList
          title="Dependents"
          nodes={selectedNode.dependents.map((n) => ({ ...n, status: nodes[n.id].status }))}
        />
      </div>
    </Fragment>
  );
}

NodeDetails.propTypes = {
  nodes: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
  details: PropTypes.instanceOf(Object),
};
