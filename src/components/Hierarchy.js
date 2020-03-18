import React from 'react';
import { getConfig } from '../services/read-config';
import LegendBlock from './LegendBlock';

export default function Hierarchy(props) {
  const { hierarchy, setGroupLevel } = props;
  return (
    <LegendBlock>
      <ul>
        {hierarchy.map((groupLevel) => (
          <li onClick={() => setGroupLevel(groupLevel)} key={groupLevel}>
            {groupLevel}
          </li>
        ))}
        <li onClick={() => setGroupLevel('node')}>node</li>
      </ul>
    </LegendBlock>
  );
}
