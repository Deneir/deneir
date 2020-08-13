import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

export default function Button(props) {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
};

export function ButtonLink(props) {
  return (
    <Link className={styles.button} {...props}>
      {props.children}
    </Link>
  );
}

ButtonLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
};
