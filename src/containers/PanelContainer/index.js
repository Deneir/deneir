import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNode } from '../../actions/nodes';

import styles from './index.module.scss';

export default function PanelContainer() {
  const dispatch = useDispatch();

  const selectedNode = useSelector((state) => state.selectedNode);

  return (
    <>
      {selectedNode && (
        <section className={styles.panel}>
          <div className={styles.header}>
            <h1>{selectNode}</h1>
            <button type="button" onClick={() => dispatch(selectNode(null))}>
              X
            </button>
          </div>
        </section>
      )}
    </>
  );
}
