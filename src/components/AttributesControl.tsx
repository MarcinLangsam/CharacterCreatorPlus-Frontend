import React from 'react';

interface StatControlProps {
  statName: string;
  statValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const StatControl: React.FC<StatControlProps> = ({ statName, statValue, onIncrement, onDecrement }) => {
  return (
    <div>
      <h3>{statName}: {statValue}</h3>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};

export default StatControl;
