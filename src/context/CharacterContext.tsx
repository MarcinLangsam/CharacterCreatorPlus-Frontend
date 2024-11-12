import React, { createContext, useContext, useState } from 'react';
import { CharacterData, CharacterAttributes, WeaponProficiencys } from '../types/CharacterData';

interface CharacterContextType {
  characterData: CharacterData;
  setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>;
}

const defaultProficiencys: WeaponProficiencys = {
  BastardSword: 0,
  LongSword: 0,
  ShortSword: 0,
  Axe: 0,
  TwoHandedSword: 0,
  Katana: 0,
  Scimtar: 0,
  Dagger: 0,
  WarHammer: 0,
  Club: 0,
  Spear: 0,
  Halberd: 0,
  Flail: 0,
  Mace: 0,
  QuarterStaff: 0,
  Crossbow: 0,
  LongBow: 0,
  ShortBow: 0,
  Dart: 0,
  Sling: 0,
  TwoHandedWeaponStyle: 0,
  SwordandShieldStyle: 0,
  SingleWeaponStyle: 0,
  TwoWeaponStyle: 0,
};


const defaultAttributes: CharacterAttributes = {
  strength: 0,
  agility: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

const defaultCharacterData: CharacterData = {
  attributes: defaultAttributes,
  skills: defaultProficiencys,
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characterData, setCharacterData] = useState<CharacterData>(defaultCharacterData);

  return (
    <CharacterContext.Provider value={{ characterData, setCharacterData }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext must be used within a CharacterProvider");
  }
  return context;
};
