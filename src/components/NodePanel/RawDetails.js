import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from './AdvancedDetails.module.scss';

export default function AdvancedDetails(props) {
  const { details } = props;

  if (Array.isArray(details)) {
    if (details.length === 0) {
      return <div>no items</div>;
    }
    return (
      <div>
        {details.map((item) => (
          <div key={item.id} className={styles.arrayItemBlock}>
            <AdvancedDetails details={item} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof details === 'object') {
    return (
      <div>
        {Object.keys(details).map((key) => {
          if (typeof details[key] === 'object') {
            return <JsonBlock key={key} title={key} data={details[key]} />;
          }
          if (details[key].length > 300) {
            return <HtmlBlock key={key} title={key} data={details[key]} />;
          }
          return (
            <div key={key}>
              <b>{key}:</b> {details[key]}
            </div>
          );
        })}
      </div>
    );
  }

  return <div>{details}</div>;
}

AdvancedDetails.propTypes = {
  details: PropTypes.instanceOf(Object),
};

function JsonBlock({ title, data }) {
  const [open, setOpen] = useState(false);
  const toggleIcon = (open && faCaretDown) || faCaretRight;

  return (
    <div>
      <b className={styles.detailsBlockTitle} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={toggleIcon} /> {title}:
      </b>
      <div className={(!open && styles.closed) || ''}>
        <pre className={styles.rawDetailsBlock}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

JsonBlock.propTypes = {
  title: PropTypes.string,
  data: PropTypes.instanceOf(Object),
};

function HtmlBlock({ title, data }) {
  const [open, setOpen] = useState(false);
  const toggleIcon = (open && faCaretDown) || faCaretRight;

  return (
    <div>
      <b className={styles.detailsBlockTitle} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={toggleIcon} /> {title}:
      </b>
      <div className={(!open && styles.closed) || ''}>
        <div className={styles.HtmlBlock} dangerouslySetInnerHTML={{ __html: data }}></div>
      </div>
    </div>
  );
}

HtmlBlock.propTypes = {
  title: PropTypes.string,
  data: PropTypes.string,
};
