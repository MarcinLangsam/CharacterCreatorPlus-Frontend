import React, { useEffect, useState } from 'react';
import CreateNewCharacter from '../components/CreateNewCharacter';
import CreatedCharacterPanel from '../components/CreatedCharacter';

export interface CreatedCharacter {
  level: number;
  name: string;
  gender: string;
  portrait: string;
  race: string;
  classes: string;
  subclasses: string;
  aligment: string,
  strength: number;
  strengthModifier: number;
  agility: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number,
  skillsId: number,
  skillsThiefId: number,
  racialEnemy: string;

  baseThac0: number,
  melleThac0: number,
  classBonusThac0: number,
  dmgBonus: number,
  bashing: number,
  weight: number,

  rangedThac0: number,
  baseAC: number,
  AC: number,
  classBonusAC: number,
  Kradziez_KieszonkowaBonus: number, 
  Otwieranie_ZamkowBonus: number,
  Znajdywanie_PulapekBonus: number,
  Ciche_PoruszanieBonus: number,
  Krycie_W_CieniuBonus: number,
  Rozstawianie_PulapekBonus: number,

  HPdice: number,

  HPperLvBonus: number,
  IntoxicationPerDrink: number,
  fatigue: number,

  INTmaxSpellLevel: number,
  INTspellPerLevel: number,
  scribeSuccessRate: number,
  INTlore: number,

  extraSpellSlotlv1: number,
  extraSpellSlotlv2: number,
  extraSpellSlotlv3: number,
  extraSpellSlotlv4: number,
  WISlore: number,

  reaction: number,
  buyDiscount: number,
  bonuses: string;
}

const MainMenu: React.FC = () => {
  const [characterList, setCharacterList] = useState<CreatedCharacter[] | undefined>(undefined);

  const fetchCharacters = async () => {
    try {
      let response = await fetch("http://localhost:3000/characters");
      if(response != undefined) {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharacterList(data)
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);



  return (
    <div className='d-flex flex-wrap'>
      {characterList && characterList.length > 0 ? (
        characterList.map((character, index) => (
          <CreatedCharacterPanel
            key={index}
            name={character.name}
            race={character.race}
            classes={character.classes}
            subclasses={character.subclasses}
            portrait={character.portrait}
            gender={character.gender}
            createdCharacter={character}
          />
        ))
      ) : (
        <p>{characterList === undefined ? 'Wczytywanie postaci...' : null }</p>
      )}

      <CreateNewCharacter/>
    </div>
  );
};

export default MainMenu;