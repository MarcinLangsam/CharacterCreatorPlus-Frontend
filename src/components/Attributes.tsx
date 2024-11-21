import React, { useEffect, useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import StatControl from './AttributesControl';
import { CharacterAttributes } from '../types/CharacterData';

const raceAttributeLimits: Record<string, Partial<Record<keyof CharacterAttributes, { min: number; max: number }>>> = {
  Człowiek: { strength: {min: 3, max: 18}, agility: {min: 3, max: 18}, constitution: {min: 3, max: 18}, intelligence: {min: 3, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 3, max: 18}},
  Elf: { strength: {min: 3, max: 18}, agility: {min: 7, max: 19}, constitution: {min: 6, max: 17}, intelligence: {min: 8, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 8, max: 18} },
  Pół_Elf: {strength: {min: 3, max: 18}, agility: {min: 6, max: 18}, constitution: {min: 6, max: 18}, intelligence: {min: 4, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 3, max: 18}},
  Krasnolud: { strength: {min: 8, max: 18}, agility: {min: 2, max: 17}, constitution: {min: 12, max: 19}, intelligence: {min: 3, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 1, max: 16} },
  Niziołek: {strength: {min: 6, max: 17}, agility: {min: 8, max: 19}, constitution: {min: 10, max: 18}, intelligence: {min: 6, max: 18}, wisdom: {min: 2, max: 17}, charisma: {min: 3, max: 18}},
  Gnom: { strength: {min: 6, max: 18}, agility: {min: 3, max: 18}, constitution: {min: 3, max: 18}, intelligence: {min: 3, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 3, max: 18} },
  Pół_Ork: { strength: {min: 4, max: 19}, agility: {min: 3, max: 18}, constitution: {min: 4, max: 19}, intelligence: {min: 1, max: 16}, wisdom: {min: 3, max: 18}, charisma: {min: 3, max: 18} },
};

const classAttributeLimits: Record<string, Partial<Record<keyof CharacterAttributes, number>>> = {
  Wojownik: { strength: 9 },
  Łowca: { strength: 13, agility: 13, constitution: 14, wisdom: 14 },
  Paladyn: { strength: 12, constitution: 9, wisdom: 13, charisma: 17 },
  Kleryk: { wisdom: 9 },
  Druid: { wisdom: 12, charisma: 15 },
  Mag: { intelligence: 9 },
  Łotrzyk: { agility: 9 },
  Bard: { agility: 12, intelligence: 13, charisma: 15 },
  Czarodziej: { intelligence: 9, charisma: 9 },
  Monk: { agility: 9, constitution: 9, wisdom: 9 },
  Shaman: { constitution: 12, wisdom: 12 },
};

const allowedClassesForModifier = ['Wojownik', 'Łowca', 'Paladyn'];

const Stats: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const [availablePoints, setAvailablePoints] = useState(0);
  const [totalRolledPoints, setTotalRolledPoints] = useState(0);
  

  const isModifierApplicable = (): boolean => {
    const selectedClass = characterData.classes;
    if (!selectedClass) return false;
    return allowedClassesForModifier.includes(selectedClass);
  };

  const getRaseLimit = (): Partial<Record<keyof CharacterAttributes, { min: number; max: number }>> => {
    const selectedRase = characterData.race
    if (!selectedRase) return {};
    return raceAttributeLimits[selectedRase] || {};
  }

  const getClassLimit = (): Partial<Record<keyof CharacterAttributes, number>> => {
    const selectedClass = characterData.classes
    if (!selectedClass) return {};
    return classAttributeLimits[selectedClass] || {};
  }

  const getRandomValueInRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomizeAttributes = () => {
    const raceLimits = getRaseLimit();
    const classLimits = getClassLimit();

    const newAttributes = (Object.keys(characterData.attributes) as (keyof CharacterAttributes)[]).reduce(
      (attrs, attr) => {
        const raceMin = raceLimits[attr]?.min ?? 1;
        const raceMax = raceLimits[attr]?.max ?? 18;
        const classMin = classLimits[attr] ?? 1;

        const finalMin = Math.max(raceMin, classMin);
        const finalMax = raceMax;

        attrs[attr] = getRandomValueInRange(finalMin, finalMax);
        return attrs;
      },
      {} as CharacterAttributes
    );

    const sumPoints = Object.values(newAttributes).reduce((sum, value) => sum + value, 0);

    if (isModifierApplicable()) {
      newAttributes.strenghtModifier = getRandomValueInRange(0, 100);
    } else {
      newAttributes.strenghtModifier = 0;
    }

    setCharacterData((prevData) => ({
      ...prevData,
      attributes: newAttributes,
    }));

    setTotalRolledPoints(sumPoints);
    setAvailablePoints(0);
  };

  const updateAttribute = (attribute: keyof CharacterAttributes, delta: number) => {
    setCharacterData((prevData) => {
      const currentAttributeValue = prevData.attributes[attribute];
      

      const raceLimits = getRaseLimit();
      const classLimits = getClassLimit();

      const raceMin = raceLimits[attribute]?.min ?? 1;
      const raceMax = raceLimits[attribute]?.max ?? 18;
      const classMin = classLimits[attribute] ?? 1;

      const finalMin = Math.max(raceMin, classMin);
      const finalMax = raceMax;

      const newValue = currentAttributeValue + delta;

      if(delta > 0 && newValue < finalMax && availablePoints <= 0)
      {
        delta = 0;
        return prevData
      }

      if (newValue < finalMin || newValue > finalMax) {
        delta = 0;
        return prevData;
      }
  
      const updatedAttributes = {
        ...prevData.attributes,
        [attribute]: newValue,
      };
  
      return {
        ...prevData,
        attributes: updatedAttributes,
      };
    });

    setAvailablePoints((prev) => {
      const currentAttributeValue = characterData.attributes[attribute];

      const raceLimits = getRaseLimit();
      const classLimits = getClassLimit();

      const raceMin = raceLimits[attribute]?.min ?? 1;
      const raceMax = raceLimits[attribute]?.max ?? 18;
      const classMin = classLimits[attribute] ?? 1;

      const finalMin = Math.max(raceMin, classMin);
      const finalMax = raceMax;
      
      if (delta == 0) {
        return prev;
      }

      if (delta > 0 && currentAttributeValue + delta <= finalMax) {
        return prev - 1;
      }
  
      if (delta < 0 && currentAttributeValue + delta >= finalMin) {
        return prev + 1; 
      }
  
      return prev;
    });
  };

  return (
    <div>
      <h2>Rozdaj Atrybuty</h2>

      <button onClick={randomizeAttributes} className="border border-black m-2 bg-gray-800 p-2 text-white">
        Powtórz rzut
      </button>

      <p className="mt-2">Suma Wylosowanych Punktów: {totalRolledPoints}</p>
      <p>Punkty Do Wydania: {availablePoints}</p>

      <StatControl
        statName={
          characterData.attributes.strength === 18 && isModifierApplicable()
            ? `Siła ${characterData.attributes.strength}/${characterData.attributes.strenghtModifier}`
            : 'Siła'
        }
        statValue={characterData.attributes.strength}
        onIncrement={() => updateAttribute('strength', 1)}
        onDecrement={() => updateAttribute('strength', -1)}
      />
      <StatControl
        statName="Zręczność"
        statValue={characterData.attributes.agility}
        onIncrement={() => updateAttribute('agility', 1)}
        onDecrement={() => updateAttribute('agility', -1)}
      />
      <StatControl
        statName="Kondycja"
        statValue={characterData.attributes.constitution}
        onIncrement={() => updateAttribute('constitution', 1)}
        onDecrement={() => updateAttribute('constitution', -1)}
      />
      <StatControl
        statName="Inteligencja"
        statValue={characterData.attributes.intelligence}
        onIncrement={() => updateAttribute('intelligence', 1)}
        onDecrement={() => updateAttribute('intelligence', -1)}
      />
      <StatControl
        statName="Mądrość"
        statValue={characterData.attributes.wisdom}
        onIncrement={() => updateAttribute('wisdom', 1)}
        onDecrement={() => updateAttribute('wisdom', -1)}
      />
      <StatControl
        statName="Charyzma"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('charisma', 1)}
        onDecrement={() => updateAttribute('charisma', -1)}
      />
      
    </div>
  );
};

export default Stats;
