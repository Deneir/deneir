import React from 'react';
import LegendBlock from './LegendBlock';

export default function Hierarchy(props) {
  const { hierarchy, setGroupLevel, groupLevel } = props;
  const hierarchyOptions = [...hierarchy, 'node'];

  return (
    <LegendBlock title="hierarchy">
      <ul>
        {hierarchyOptions.map((groupLevelOption) => (
          <li key={groupLevelOption}>
            <input
              id={`hierarchy-${groupLevelOption}`}
              type="radio"
              name="hierarchy"
              value={groupLevelOption}
              checked={groupLevel === groupLevelOption}
              onChange={() => setGroupLevel(groupLevelOption)}
            />
            <label htmlFor={`hierarchy-${groupLevelOption}`}>{groupLevelOption}</label>
          </li>
        ))}
      </ul>
    </LegendBlock>
  );
}
