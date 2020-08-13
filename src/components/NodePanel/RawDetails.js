import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from './RawDetails.module.scss';

export default function RawDetails(props) {
  const { details } = props;

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

RawDetails.propTypes = {
  details: PropTypes.instanceOf(Object),
};

function JsonBlock({ title, data }) {
  const [open, setOpen] = useState(false);
  const toggleIcon = (open && faCaretDown) || faCaretRight;

  return (
    <div>
      <button className={styles.detailsBlockTitle} onClick={() => setOpen(!open)}>
        <span>{title}</span> <FontAwesomeIcon icon={toggleIcon} />
      </button>
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
      <button className={styles.detailsBlockTitle} onClick={() => setOpen(!open)}>
        <span>{title}</span> <FontAwesomeIcon icon={toggleIcon} />
      </button>
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
