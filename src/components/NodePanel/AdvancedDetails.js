import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RawDetails from './RawDetails';
import StatusBubble from '../StatusBubble';
import styles from './AdvancedDetails.module.scss';

export default function AdvancedDetails(props) {
  const { details } = props;

  if (Array.isArray(details)) {
    if (details.length === 0) {
      return <div>no items</div>;
    }
    return (
      <div>
        {details.map((item) => {
          return <InstanceDetails key={item.id} {...item} />;
        })}
      </div>
    );
  }
  return 'Node details should be an array of objects';
}

AdvancedDetails.propTypes = {
  details: PropTypes.instanceOf(Object),
};

function InstanceDetails({
  dependencies, url, id, title, details,
}) {
  const [open, setOpen] = useState(false);
  const toggleIcon = (open && faArrowDown) || faArrowRight;
  const statusCode = dependencies && Math.max(...dependencies.map((d) => d.status.code));

  return (
    <div>
      <h3 className={styles.instanceTitle} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={toggleIcon} />{' '}
        {statusCode !== false && <StatusBubble statusCode={statusCode} />} {title}
      </h3>
      <div className={(!open && styles.closed) || ''}>
        <div key={id} className={styles.arrayItemBlock}>
          <p>
            {id} {url && <a href={url}>(url)</a>}
          </p>
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
