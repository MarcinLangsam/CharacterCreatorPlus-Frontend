import React from 'react';

interface StatControlProps {
  statName: string;
  statValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const StatControl: React.FC<StatControlProps> = ({ statName, statValue, onIncrement, onDecrement }) => {
  return (
    <div className='flex flex-row'>
      <h2>{statName}: {statValue}</h2>
      <button className="border border-black m-2 bg-yellow-700 p-2" onClick={onIncrement}>+</button>
      <button className="border border-black m-2 bg-yellow-700 p-2" onClick={onDecrement}>-</button>
    </div>
  );
};

export default StatControl;
