import React from 'react';

interface ProficiencyControlProps {
  statName: string;
  statValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const StatControl: React.FC<ProficiencyControlProps> = ({ statName, statValue, onIncrement, onDecrement }) => {
  return (
    <div className='flex flex-row'>
      <h2 className='plainText'>{statName}: {statValue}</h2>
      <button className="statsButton" onClick={onIncrement}>+</button>
      <button className="statsButton" onClick={onDecrement}>-</button>
    </div>
  );
};

export default StatControl;
