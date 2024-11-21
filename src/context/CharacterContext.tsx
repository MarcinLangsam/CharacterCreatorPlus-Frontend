import React, { createContext, useContext, useState } from 'react';
import { CharacterData, CharacterAttributes, WeaponProficiencys, ThievingAbilities } from '../types/CharacterData';

interface CharacterContextType {
  characterData: CharacterData;
  setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>;
}

const defaultProficiencys: WeaponProficiencys = {
  MieczePółtoraręczne: -1,
  MieczeDługie: -1,
  MieczeKrótkie: -1,
  Topory: -1,
  MieczeDwóręczne: -1,
  Katana: -1,
  Scimtar: -1,
  Sztylety: -1,
  MłotyWojenne: -1,
  Maczugi: -1,
  Włócznie: -1,
  Halabarda: -1,
  Korbacze: -1,
  Wiekiery: -1,
  KijeBojowe: -1,
  Kusze: -1,
  DługieŁuki: -1,
  KrótkieŁuki: -1,
  Strzałki: -1,
  Proce: -1,
  StylBroniDwóręcznych: -1,
  StylMieczaITarczy: -1,
  StylMieczaJednoręcznego: -1,
  StylDwóchBroni: -1,
};

const defaultThievingAbilities: ThievingAbilities = {
  Otwieranie_Zamków: -1,
  Kradzież_Kieszonkowa: -1,
  Ciche_Poruszanie: -1,
  Krycie_W_Cieniu: -1,
  Znajdywanie_Pułapek: -1,
  Wykrywanie_Iluzji: -1,
  Rozstawianie_Pułapek: -1,
};


const defaultAttributes: CharacterAttributes = {
  strength: 0,
  strenghtModifier : 0,
  agility: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

const defaultCharacterData: CharacterData = {
  attributes: defaultAttributes,
  skills: defaultProficiencys,
  skillsThief: defaultThievingAbilities,
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
