import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ListContent from './list-content';

import styles from './index.module.scss';
import togglePanel from '../../actions/panel';

export default function PanelContainer({ meta }) {
  const dispatch = useDispatch();

  const { selectedNode } = useSelector((state) => state.nodes);
  const { loading, payload } = useSelector((state) => state.status);
  const { openedPanel } = useSelector((state) => state.panel);

  const { title = selectedNode, subtitle = '', processName = '' } = meta;

  return (
    <>
      {openedPanel && (
        <section className={`${styles.panel}`}>
          <div className={styles.header}>
            <h1>{title}</h1>
            <button type="button" onClick={() => dispatch(togglePanel(false))}>X</button>
          </div>
          {loading ? <p>Loading ...</p>
            : !loading && (
            <div className={styles.titleSection}>
              {payload.length > 0
                && (
                <p>
                  {payload.length}
                    {' '}
                    { processName }
                </p>
                )}
              <h2>{subtitle}</h2>
                {!payload.length ? <p>No data</p>
                  : <ListContent payload={payload} />}
            </div>
            )}
        </section>
      )}
    </>
  );
}

PanelContainer.propTypes = {
  meta: PropTypes.shape({
    subtitle: PropTypes.string,
    title: PropTypes.string,
    processName: PropTypes.string,
  }),
};

PanelContainer.defaultProps = {
  meta: PropTypes.shape({
    subtitle: '',
    title: '',
    processName: '',
  }),
};
