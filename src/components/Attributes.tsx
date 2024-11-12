import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import StatControl from './AttributesControl';
import { CharacterAttributes } from '../types/CharacterData';

const Stats: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();

  const updateAttribute = (attribute: keyof CharacterAttributes, delta: number) => {
    setCharacterData((prevData) => ({
      ...prevData,
      attributes: {
        ...prevData.attributes,
        [attribute]: prevData.attributes[attribute] + delta,
      },
    }));
  };

  return (
    <div>
      <h2>Set Attributes</h2>
      <StatControl
        statName="Strength"
        statValue={characterData.attributes.strength}
        onIncrement={() => updateAttribute('strength', 1)}
        onDecrement={() => updateAttribute('strength', -1)}
      />
      <StatControl
        statName="Agility"
        statValue={characterData.attributes.agility}
        onIncrement={() => updateAttribute('agility', 1)}
        onDecrement={() => updateAttribute('agility', -1)}
      />
      <StatControl
        statName="Constitution"
        statValue={characterData.attributes.constitution}
        onIncrement={() => updateAttribute('constitution', 1)}
        onDecrement={() => updateAttribute('constitution', -1)}
      />
      <StatControl
        statName="Intelligence"
        statValue={characterData.attributes.intelligence}
        onIncrement={() => updateAttribute('intelligence', 1)}
        onDecrement={() => updateAttribute('intelligence', -1)}
      />
      <StatControl
        statName="Wisdom"
        statValue={characterData.attributes.wisdom}
        onIncrement={() => updateAttribute('wisdom', 1)}
        onDecrement={() => updateAttribute('wisdom', -1)}
      />
      <StatControl
        statName="Charisma"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('charisma', 1)}
        onDecrement={() => updateAttribute('charisma', -1)}
      />
    </div>
  );
};

export default Stats;
