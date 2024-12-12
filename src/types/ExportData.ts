import { CharacterAttributes, ThievingAbilities, WeaponProficiencys } from "./CharacterData";


export interface ThievingAbilitiesExport {
  Otwieranie_Zamkow: number;
  Kradziez_Kieszonkowa: number;
  Ciche_Poruszanie: number;
  Krycie_W_Cieniu: number;
  Znajdywanie_Pulapek: number;
  Wykrywanie_Iluzji: number;
  Rozstawianie_Pulapek: number;
}

export interface WeaponProficiencysExport {
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

export interface SubclassesExport {
  Wojownik: string,
  Berserker: string,
  Zabójca_Magów: string,
  Kensai: string,
  Krasnoludzki_Obrońca: string,
  Barbarzyńca: string,
  Łowca: string,
  Łucznik: string,
  Tropiciel: string,
  Władca_Zwierząt: string,
  Paladyn: string,
  Kawalerzysta: string,
  Inkwizytor: string,
  Łowca_Nieumarłych: string,
  Czarny_Strażnik: string,
  Kapłan: string,
  Kapłan_Talosa: string,
  Kapłan_Helma: string,
  Kapłan_Lathandera: string,
  Kapłan_Tyra: string,
  Kapłan_Tempusa: string,
  Druid: string,
  Totemiczny_Druid: string,
  Zmiennokształtny: string,
  Mściciel: string,
  Mag: string,
  Mag_Specjalista: string,
  Dziki_Mag: string,
  Złodziej: string,
  Zabójca: string,
  Łowca_Nagród: string,
  Zawadiaka: string,
  Tancerz_Cieni: string,
  Bard: string,
  Błazen: string,
  Fechmistrz: string,
  Skald: string,
  Czarownik: string,
  Uczeń_Smoka: string,
  Mnich: string,
  Mnich_Ciemnego_Księżyca: string,
  Mnich_Słonecznej_Duszy: string,
  Szaman: string,
}

export interface ExportData {
    //character export data
    name: string[];
    gender: string;
    portrait: string[];
    race: string;
    classes: string;
    subclasses: string;
    character: string;
    attributes: CharacterAttributes;
    skills: Record<keyof WeaponProficiencys, number>;
    skillsThief:  Record<keyof ThievingAbilities, number>;   
  }