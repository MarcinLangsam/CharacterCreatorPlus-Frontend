export interface WeaponProficiencys {
  BastardSword: number;
  LongSword: number;
  ShortSword: number;
  Axe: number;
  TwoHandedSword: number;
  Katana: number;
  Scimtar: number;
  Dagger: number;
  WarHammer: number;
  Club: number;
  Spear: number;
  Halberd: number;
  Flail: number;
  Mace: number;
  QuarterStaff: number;
  Crossbow: number;
  LongBow: number;
  ShortBow: number;
  Dart: number;
  Sling: number;
  TwoHandedWeaponStyle: number;
  SwordandShieldStyle: number;
  SingleWeaponStyle: number;
  TwoWeaponStyle: number;
}

export interface CharacterAttributes {
  strength: number;
  agility: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CharacterData {
  gender?: string;
  portrait?: string;
  race?: string;
  classes?: string;
  character?: string;
  attributes: CharacterAttributes;
  skills: WeaponProficiencys;
}
