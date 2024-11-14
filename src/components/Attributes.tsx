import React, { useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import StatControl from './AttributesControl';
import { CharacterAttributes } from '../types/CharacterData';

const Stats: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();

  const randomizeAttributes = () => {
    const getRandomValue = () => Math.floor(Math.random() * 18) + 1;
    
    setCharacterData((prevData) => ({
      ...prevData,
      attributes: {
        strength: getRandomValue(),
        agility: getRandomValue(),
        constitution: getRandomValue(),
        intelligence: getRandomValue(),
        wisdom: getRandomValue(),
        charisma: getRandomValue(),
      },
    }));
  };

  useEffect(() => {
    randomizeAttributes();
  }, []);

  const updateAttribute = (attribute: keyof CharacterAttributes, delta: number) => {
    setCharacterData((prevData) => {
      const newValue = prevData.attributes[attribute] + delta;
      const clampedValue = Math.max(1, Math.min(18, newValue));

      return {
        ...prevData,
        attributes: {
          ...prevData.attributes,
          [attribute]: clampedValue,
        },
      };
    });
  };


  return (
    <div>
      <h2>Rozdaj Atrybuty</h2>

      <button onClick={randomizeAttributes} className="border border-black m-2 bg-gray-800 p-2 text-white">
        Powtórz rzut
      </button>

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
