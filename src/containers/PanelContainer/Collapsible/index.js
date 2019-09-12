/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

export default function Collapsible(props) {
  const [open, togglePanel] = useState(false);
  const { title, children, className = '' } = props;

  return (
    <>
      <header
        onClick={() => togglePanel(!open)}
      >
        {title}
        <button
          type="button"
          onClick={() => togglePanel(!open)}
          className={`${styles.header} ${className}`}
        >
          {open ? 'v' : '<'}
        </button>
      </header>
      {open ? children : null}
    </>
  );
}

Collapsible.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
};

Collapsible.defaultProps = {
  className: '',
};
