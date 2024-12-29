import React, { createContext, useContext, useState } from 'react';
import { CharacterData, CharacterAttributes, WeaponProficiencys, ThievingAbilities } from '../types/CharacterData';

interface CharacterContextType {
  characterData: CharacterData;
  setCharacterData: React.Dispatch<React.SetStateAction<CharacterData>>;
}

const defaultProficiencys: WeaponProficiencys = {
  MieczePoltorareczne: -1,
  MieczeDlugie: -1,
  MieczeKrotkie: -1,
  Topory: -1,
  MieczeObureczne: -1,
  Katany: -1,
  SejmitarWakizashiNinjaTo: -1,
  Sztylety: -1,
  MlotyBojowe: -1,
  Maczugi: -1,
  Wlocznie: -1,
  Halabarda: -1,
  CepyBojoweMorgernszterny: -1,
  Wiekiery: -1,
  Kije: -1,
  Kusze: -1,
  DlugieLuki: -1,
  KrotkieLuki: -1,
  Strzalki: -1,
  Proce: -1,
  StylWalkiBroniaDwureczna: -1,
  StylWalkiMieczemITarcza: -1,
  StylWalkiJednaBronia: -1,
  StylWalkiDwiemaBronmi: -1,

};

export const defaultThievingAbilities: ThievingAbilities = {
  Otwieranie_Zamkow: -1,
  Kradziez_Kieszonkowa: -1,
  Ciche_Poruszanie: -1,
  Krycie_W_Cieniu: -1,
  Znajdywanie_Pulapek: -1,
  Wykrywanie_Iluzji: -1,
  Rozstawianie_Pulapek: -1,
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
  wizardSpells: []
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
