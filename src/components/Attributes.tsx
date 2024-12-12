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
  Szaman: { constitution: 12, wisdom: 12 },
};

const allowedClassesForModifier = ['Wojownik', 'Łowca', 'Paladyn'];

interface StrengthData {
  id: number;
  value: number;
  meleeThac0: number;
  dmgBonus: number;
  bashing: number;
  weight: number;
}
interface AgilityData {
  id: number;
  value: number;
  rangedThac0: number;
  ac: number;
  Kradziez_KieszonkowaBonus: number;
  Otwieranie_ZamkowBonus: number;
  Znajdywanie_PulapekBonus: number;
  Ciche_PoruszanieBonus: number;
  Krycie_W_CieniuBonus: number;
  Rozstawianie_PulapekBonus: number;
}
interface ConstitutionData {
  id: number;
  value: number;
  hpPerLevelBonus: number;
  intoxicationPerDrink: number;
  fatigue: number;
}
interface InteligneceData {
  id: number;
  value: number;
  INTmaxSpellLevel: number;
  INTspellPerLevel: number;
  scribeSuccessRate: number;
  INTlore: number;
}
interface WisdomData {
  id: number;
  value: number;
  extraSpellSlotlv1: number;
  extraSpellSlotlv2: number;
  extraSpellSlotlv3: number;
  extraSpellSlotlv4: number;
  WISlore: number;
}
interface CharismaData {
  id: number;
  value: number;
  reaction: number;
  buyDiscount: number;
}

const Stats: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const [availablePoints, setAvailablePoints] = useState(0);
  const [totalRolledPoints, setTotalRolledPoints] = useState(0);
  const [strengthData, setStrengthData] = useState<StrengthData[]>([]);
  const [agilityData, setAgilityData] = useState<AgilityData[]>([]);
  const [constitutionData, setConstitutionData] = useState<ConstitutionData[]>([]);
  const [inteligenceData, setIntelignceData] = useState<InteligneceData[]>([]);
  const [wisdomData, setWisdomData] = useState<WisdomData[]>([]);
  const [charismaData, setCharismaData] = useState<CharismaData[]>([]);
  

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

  useEffect(() => {
    const fetchStrength = async () => {
      try {
        const response = await fetch("http://localhost:3000/strength");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStrengthData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchAgility = async () => {
      try {
        const response = await fetch("http://localhost:3000/agility");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAgilityData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchConstitution = async () => {
      try {
        const response = await fetch("http://localhost:3000/constitution");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConstitutionData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchInteligence = async () => {
      try {
        const response = await fetch("http://localhost:3000/inteligence");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setIntelignceData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchWisdom = async () => {
      try {
        const response = await fetch("http://localhost:3000/wisdom");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWisdomData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchCharisma = async () => {
      try {
        const response = await fetch("http://localhost:3000/charisma");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharismaData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    fetchStrength();
    fetchAgility();
    fetchConstitution();
    fetchInteligence();
    fetchWisdom();
    fetchCharisma();

  }, []);

  useEffect(() => {
    const strengthMatch = strengthData.find((item) => item.value === characterData.attributes.strength);
    if (strengthMatch) {
      characterData.melleThac0 = strengthMatch.meleeThac0,
      characterData.dmgBonus = strengthMatch.dmgBonus,
      characterData.bashing = strengthMatch.bashing,
      characterData.weight = strengthMatch.weight
    }
    const agilityhMatch = agilityData.find((item) => item.value === characterData.attributes.agility);
    if (agilityhMatch) {
      characterData.rangedThac0 = agilityhMatch.rangedThac0,
      characterData.AC = agilityhMatch.ac,
      characterData.Otwieranie_ZamkówBonus = agilityhMatch.Otwieranie_ZamkowBonus,
      characterData.Kradzież_KieszonkowaBonus = agilityhMatch.Kradziez_KieszonkowaBonus,
      characterData.Ciche_PoruszanieBonus = agilityhMatch.Ciche_PoruszanieBonus,
      characterData.Krycie_W_CieniuBonus = agilityhMatch.Krycie_W_CieniuBonus,
      characterData.Znajdywanie_PułapekBonus = agilityhMatch.Znajdywanie_PulapekBonus,
      characterData.Rozstawianie_Pułapek = agilityhMatch.Rozstawianie_PulapekBonus
    }
    const constitutionMatch = constitutionData.find((item) => item.value === characterData.attributes.constitution);
    if (constitutionMatch) {
      characterData.HPperLvBonus = constitutionMatch.hpPerLevelBonus,
      characterData.IntoxicationPerDrink = constitutionMatch.intoxicationPerDrink,
      characterData.fatigue = constitutionMatch.fatigue
    }
    const inteligenceMatch = inteligenceData.find((item) => item.value === characterData.attributes.intelligence);
    if (inteligenceMatch) {
      characterData.INTmaxSpellLevel = inteligenceMatch.INTmaxSpellLevel,
      characterData.INTspellPerLevel = inteligenceMatch.INTspellPerLevel,
      characterData.scribeSuccessRate = inteligenceMatch.scribeSuccessRate,
      characterData.INTlore = inteligenceMatch.INTlore
    }
    const wisdomMatch = wisdomData.find((item) => item.value === characterData.attributes.wisdom);
    if (wisdomMatch) {
      characterData.extraSpellSlotlv1 = wisdomMatch.extraSpellSlotlv1,
      characterData.extraSpellSlotlv2 = wisdomMatch.extraSpellSlotlv2,
      characterData.extraSpellSlotlv3 = wisdomMatch.extraSpellSlotlv3,
      characterData.extraSpellSlotlv4 = wisdomMatch.extraSpellSlotlv4,
      characterData.WISlore = wisdomMatch.WISlore
    }
    const charismaMatch = charismaData.find((item) => item.value === characterData.attributes.charisma);
    if (charismaMatch) {
      characterData.reaction = charismaMatch.reaction,
      characterData.buyDiscount = charismaMatch.buyDiscount
    }
  }, [characterData.attributes, totalRolledPoints]);

  

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
    <>
      <h2 className="secondaryText">Rozdaj Atrybuty</h2>
      <div className="attributesBackground">
        <button onClick={randomizeAttributes} className="rollStatsButton">
          Powtórz rzut
        </button> 
        <p className="plainTextBig">Punkty do wydania: {availablePoints}</p>

        <div className='flex flex-row'> 
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
          <p className='plainTextSmall'>| THAC0: {characterData.melleThac0} |</p>
          <p className='plainTextSmall'>Bonus do obrażeń: {characterData.dmgBonus} |</p>
          <p className='plainTextSmall'>Wyważanie zamków: {characterData.bashing} |</p>
          <p className='plainTextSmall'>Udźwig: {characterData.weight} |</p>
        </div>

        <div className='flex flex-row'> 
          <StatControl
            statName="Zręczność"
            statValue={characterData.attributes.agility}
            onIncrement={() => updateAttribute('agility', 1)}
            onDecrement={() => updateAttribute('agility', -1)}
          />
          <p className='plainTextSmall'>| THAC0(dystansowe): {characterData.rangedThac0} |</p>
          <p className='plainTextSmall'>Bonus do KP: {characterData.AC} |</p>
          <p className='plainTextSmall'>Bonus kradzieży kieszonkowej: {characterData.Kradzież_KieszonkowaBonus} |</p>
          <p className='plainTextSmall'>Bonus otwierania zamków: {characterData.Otwieranie_ZamkówBonus} |</p>
          <p className='plainTextSmall'>Bonus znajdywania pułapek: {characterData.Znajdywanie_PułapekBonus} |</p>
          <p className='plainTextSmall'>Bonus cichego poruszania: {characterData.Ciche_PoruszanieBonus} |</p>
          <p className='plainTextSmall'>Bonus krycia w cieniu: {characterData.Krycie_W_CieniuBonus} |</p>
          <p className='plainTextSmall'>Bonus rozstawiania pułapek: {characterData.Rozstawianie_Pułapek} |</p>
        </div>

          <div className='flex flex-row'> 
        <StatControl
          statName="Kondycja"
          statValue={characterData.attributes.constitution}
          onIncrement={() => updateAttribute('constitution', 1)}
          onDecrement={() => updateAttribute('constitution', -1)}
        />
          <p className='plainTextSmall'>| Bonuowe zdrowie na poziom: {characterData.HPperLvBonus} |</p>
          <p className='plainTextSmall'>Mocna głowa: {characterData.IntoxicationPerDrink} |</p>
          <p className='plainTextSmall'>Próg zmęczenia: {characterData.fatigue} |</p>
          <p className='plainTextSmall'>Udźwig: {characterData.weight} |</p>
        </div>


        <div className='flex flex-row'> 
        <StatControl
          statName="Inteligencja"
          statValue={characterData.attributes.intelligence}
          onIncrement={() => updateAttribute('intelligence', 1)}
          onDecrement={() => updateAttribute('intelligence', -1)}
        />
          <p className='plainTextSmall'>| Max poziom zaklęć maga: {characterData.INTmaxSpellLevel} |</p>
          <p className='plainTextSmall'>Max zaklęć maga na poziom: {characterData.INTspellPerLevel} |</p>
          <p className='plainTextSmall'>Szansa przepisania zwoju: {characterData.scribeSuccessRate} |</p>
          <p className='plainTextSmall'>Wiedza: {characterData.INTlore} |</p>
        </div>


        <div className='flex flex-row'> 
        <StatControl
          statName="Mądrość"
          statValue={characterData.attributes.wisdom}
          onIncrement={() => updateAttribute('wisdom', 1)}
          onDecrement={() => updateAttribute('wisdom', -1)}
        />
        <p className='plainTextSmall'>| Bonus zaklęcia kleryka poziomu 1: {characterData.extraSpellSlotlv1} |</p>
        <p className='plainTextSmall'>Bonus zaklęcia kleryka poziomu 2: {characterData.extraSpellSlotlv2} |</p>
        <p className='plainTextSmall'>Bonus zaklęcia kleryka poziomu 3: {characterData.extraSpellSlotlv3} |</p>
        <p className='plainTextSmall'>Bonus zaklęcia kleryka poziomu 4: {characterData.extraSpellSlotlv4} |</p>
        <p className='plainTextSmall'>Wiedza: {characterData.WISlore} |</p>
      </div>

      <div className='flex flex-row'> 
        <StatControl
          statName="Charyzma"
          statValue={characterData.attributes.charisma}
          onIncrement={() => updateAttribute('charisma', 1)}
          onDecrement={() => updateAttribute('charisma', -1)}
        />
        <p className='plainTextSmall'>| Reakcja NPC: {characterData.reaction} |</p>
        <p className='plainTextSmall'>Zniżka w sklepach: {characterData.buyDiscount}% |</p>
      </div>

      <p className="plainTextBig">Suma Wylosowanych Punktów: {totalRolledPoints}</p>
      </div>
    </>
  );
};

export default Stats;
