import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RawDetails from './RawDetails';
import styles from './AdvancedDetails.module.scss';
import StatusList from '../StatusList';

export default function AdvancedDetails(props) {
  const { details } = props;

  if (!Array.isArray(details)) {
    return 'Node details should be an array of objects';
  }

  return (
    <StatusList
      title="Instances"
      items={details.map((item) => {
        const { dependencies } = item;

        return {
          ...item,
          status: dependencies && Math.max(...dependencies.map((d) => d.status.code)),
          content: <InstanceDetails key={item.id} {...item} />,
        };
      })}
      defaultOpen={true}
    />
  );
}

AdvancedDetails.propTypes = {
  details: PropTypes.array,
};

function InstanceDetails({ url, id, details }) {
  const [open, setOpen] = useState(false);
  const toggleIcon = (open && faCaretDown) || faCaretRight;

  return (
    <div className={styles.instanceDetails}>
      <button className={styles.instanceTitle} onClick={() => setOpen(!open)}>
        <span title={id}>{id}</span> {url && <a href={url}>(url)</a>}
        <FontAwesomeIcon icon={toggleIcon} />
      </button>
      <div className={`${styles.instanceDetailsContent} ${(!open && styles.closed) || ''}`}>
        <div key={id}>
          {details && <RawDetails details={details} />}
        </div>
      </div>
    </div>
  );
}

InstanceDetails.propTypes = {
  url: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  dependencies: PropTypes.array,
  details: PropTypes.object,
};
