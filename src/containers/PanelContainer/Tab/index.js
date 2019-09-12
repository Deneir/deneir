import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

export default function Tab(props) {
  const { label, onClick, activeTab } = props;

  const setTab = () => {
    onClick(label);
  };

  const tabListActive = activeTab === label ? 'tabListActive' : '';

  return (
    <li>
      <button
        className={`${styles.tabListItem} ${styles[tabListActive] || ''}`}
        type="button"
        onClick={setTab}
      >
        {label}
      </button>
    </li>
  );
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
