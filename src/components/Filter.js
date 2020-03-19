import React from 'react';
import LegendBlock from './LegendBlock';

export default function Filter(props) {
  const { values, filterId, onChange } = props;

  return (
    <LegendBlock title={filterId} initialOpen={false}>
      <ul>
        {values.map((value) => (
          <li key={value}>
            <input id={`${filterId}-${value}`} type="checkbox" value={value} onChange={() => onChange(filterId, value)} />
            <label htmlFor={`${filterId}-${value}`}>{value}</label>
          </li>
        ))}
      </ul>
    </LegendBlock>
  );
}