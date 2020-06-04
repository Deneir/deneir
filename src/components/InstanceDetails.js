import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './NodeDetails.module.scss';

export default function InstanceDetails(props) {
  const {
    id,
    // changelog,
    // readme,
    // agent_url: agentUrl,
    build,
    // configuration,
    defaultOpen = false,
  } = props;
  const [open, setOpen] = useState(defaultOpen);
  const toggleIcon = (open && faArrowDown) || faArrowRight;

  return (
    <div>
      <h3 onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={toggleIcon} /> {id}
      </h3>
      <div className={(!open && styles.closed) || ''}>
        <pre className={styles.rawDetailsBlock}>{JSON.stringify(build, null, 2)}</pre>
      </div>
    </div>
  );
}

InstanceDetails.propTypes = {
  id: PropTypes.string.isRequired,
  changelog: PropTypes.string,
  agent_url: PropTypes.string,
  readme: PropTypes.string,
  build: PropTypes.object,
  configuration: PropTypes.object,
  defaultOpen: PropTypes.bool,
};
