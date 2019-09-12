import React from 'react';
import GraphContainer from './containers/GraphContainer';
import PanelContainer from './containers/PanelContainer';

import styles from './index.module.scss';
import { getConfig } from './services/read-config';

function App() {
  const settings = getConfig('settings');
  const meta = getConfig('meta');

  return (
    <div className={styles.app}>
      <GraphContainer settings={settings} />
      <PanelContainer meta={meta} />
    </div>
  );
}

export default App;
