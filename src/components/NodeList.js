import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StatusList from './StatusList';
import styles from './NodeList.module.scss';

export default function NodeList(props) {
  const { title, nodes, defaultOpen = true } = props;

  return (
    <StatusList
      title={title}
      items={nodes.map((node) => {
        return {
          ...node,
          content: <Link className={styles.nodeLink} to={`/node/${node.id}`}>{node.id}</Link>,
        };
      })}
      defaultOpen={defaultOpen}
    />
  );
}

NodeList.propTypes = {
  nodes: PropTypes.array.isRequired,
  defaultOpen: PropTypes.bool,
  title: PropTypes.string,
};
