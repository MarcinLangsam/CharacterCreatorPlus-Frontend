import React from 'react';

interface StatControlProps {
  statName: string;
  statValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const StatControl: React.FC<StatControlProps> = ({ statName, statValue, onIncrement, onDecrement }) => {
  return (
    <div className="attributes-container" style={{backgroundColor: "rgb(30, 30, 30)"}}>
      <div className="attributes-row" style={{ backgroundColor: "rgb(30, 30, 30)" }}>
        <h2 className="attributes-header-text">{statName}: </h2>
        <div className="attributes-buttons" style={{ backgroundColor: "rgb(30, 30, 30)" }}>
          <span className="attributes-value">{statValue}</span>
          <button className="attributes-button" onClick={onIncrement}>+</button>
          <button className="attributes-button" onClick={onDecrement}>-</button>
        </div>
      </div>
    </div>
  );
};

export default StatControl;
