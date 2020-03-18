import React from 'react';
import GraphContainer from './containers/GraphContainer';
import LegendContainer from './containers/LegendContainer';
import PanelContainer from './containers/PanelContainer';

import styles from './index.module.scss';
import { getConfig } from './services/read-config';

function App() {
  const meta = getConfig('meta');

  return (
    <div className={styles.app}>
      <GraphContainer />
      <LegendContainer />
      <PanelContainer meta={meta} />
    </div>
  );
}

export default App;
