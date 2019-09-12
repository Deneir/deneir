import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './index';
import styles from './index.module.scss';

export default function Tabs(props) {
  const { children, className = '' } = props;
  const [activeTab, onClickTabItem] = useState(children[0].props.label);

  return (
    <div className={styles.tabs}>
      <ul className={styles.tabList}>
        {children.map((child) => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={() => onClickTabItem(label)}
            />
          );
        })}
      </ul>
      <div className={className}>
        {children.map((child) => (child.props.label === activeTab ? child.props.children : ''))}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string,
};

Tabs.defaultProps = {
  className: '',
};
