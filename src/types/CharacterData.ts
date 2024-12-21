import { SetStateAction } from "react";

export interface WeaponProficiencys {
  MieczePoltorareczne: number;
  MieczeDlugie: number;
  MieczeKrotkie: number;
  Topory: number;
  MieczeObureczne: number;
  Katany: number;
  SejmitarWakizashiNinjaTo: number;
  Sztylety: number;
  MlotyBojowe: number;
  Maczugi: number;
  Wlocznie: number;
  Halabarda: number;
  CepyBojoweMorgernszterny: number;
  Wiekiery: number;
  Kije: number;
  Kusze: number;
  DlugieLuki: number;
  KrotkieLuki: number;
  Strzalki: number;
  Proce: number;
  StylWalkiBroniaDwureczna: number;
  StylWalkiMieczemITarcza: number;
  StylWalkiJednaBronia: number;
  StylWalkiDwiemaBronmi: number;
}

export interface ThievingAbilities {
  Otwieranie_Zamkow: number;
  Kradziez_Kieszonkowa: number;
  Ciche_Poruszanie: number;
  Krycie_W_Cieniu: number;
  Znajdywanie_Pulapek: number;
  Wykrywanie_Iluzji: number;
  Rozstawianie_Pulapek: number;
}

export interface CharacterAttributes {
  strength: number;
  strenghtModifier: number; // only for warriors/hunters/paladins
  agility: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CharacterData {
  //character creation data
  name?: string
  gender?: string;
  portrait?: string;
  race?: string;
  classes?: string;
  subclasses?: string;
  character?: string;
  attributes: CharacterAttributes;
  skills: WeaponProficiencys;
  skillsThief:  ThievingAbilities;
  racialEnemy?: string;
  //details stats data
  melleThac0?: number;
  dmgBonus?: number;
  bashing?: number;
  weight?: number;

  rangedThac0?: number;
  AC?: number;
  Kradzież_KieszonkowaBonus?: number; //if kit allows this ability
  Otwieranie_ZamkówBonus?: number; //if kit allows this ability
  Znajdywanie_PułapekBonus?: number; //if kit allows this ability
  Ciche_PoruszanieBonus?: number; //if kit allows this ability
  Krycie_W_CieniuBonus?: number; //if kit allows this ability
  Rozstawianie_Pułapek?: number; //if kit allows this ability

  HPdice?: number;
  HP?: number;

  HPperLvBonus?: number;
  IntoxicationPerDrink?: number;
  fatigue?: number;

  INTmaxSpellLevel?: number; //only for mages/bards
  INTspellPerLevel?: number; //only for mages/bards
  scribeSuccessRate?: number;
  INTlore?: number;

  extraSpellSlotlv1?: number; //only for clerics/druids
  extraSpellSlotlv2?: number; //only for clerics/druids
  extraSpellSlotlv3?: number; //only for clerics/druids
  extraSpellSlotlv4?: number; //only for clerics/druids
  WISlore?: number;

  reaction?: number;
  buyDiscount?: number;
  bonuses?: string;
}