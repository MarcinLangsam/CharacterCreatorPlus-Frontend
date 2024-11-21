import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { ThievingAbilities, WeaponProficiencys } from "../types/CharacterData";
import StatControl from "./ProficiencysControl";

const subclassProficiencies: Record<string, { skills: Partial<WeaponProficiencys>, skillPoints: number }> = {
  Wojownik: {
    skills: {
      MieczePółtoraręczne: 5,
      MieczeDługie: 5,
      MieczeKrótkie: 5,
      Topory: 5,
      MieczeDwóręczne: 5,
      Katana: 5,
      Scimtar: 5,
      Sztylety: 5,
      MłotyWojenne: 5,
      Maczugi: 5,
      Włócznie: 5,
      Halabarda: 5,
      Korbacze: 5,
      Wiekiery: 5,
      KijeBojowe: 5,
      Kusze: 5,
      DługieŁuki: 5,
      KrótkieŁuki: 5,
      Strzałki: 5,
      Proce: 5,
      StylBroniDwóręcznych: 5,
      StylMieczaITarczy: 5,
      StylMieczaJednoręcznego: 5,
      StylDwóchBroni: 5,
    },
    skillPoints: 6,
    },
  Berserker: {
    skills: {
    MieczePółtoraręczne: 5,
    MieczeDługie: 5,
    MieczeKrótkie: 5,
    Topory: 5,
    MieczeDwóręczne: 5,
    Katana: 5,
    Scimtar: 5,
    Sztylety: 5,
    MłotyWojenne: 5,
    Maczugi: 5,
    Włócznie: 5,
    Halabarda: 5,
    Korbacze: 5,
    Wiekiery: 5,
    KijeBojowe: 5,
    Kusze: 1,
    DługieŁuki: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 5,
    StylMieczaITarczy: 5,
    StylMieczaJednoręcznego: 5,
    StylDwóchBroni: 5,
  },
  skillPoints: 6,
  },
  Zabójca_Magów: {
    skills: {
    MieczePółtoraręczne: 5,
    MieczeDługie: 5,
    MieczeKrótkie: 5,
    Topory: 5,
    MieczeDwóręczne: 5,
    Katana: 5,
    Scimtar: 5,
    Sztylety: 5,
    MłotyWojenne: 5,
    Maczugi: 5,
    Włócznie: 5,
    Halabarda: 5,
    Korbacze: 5,
    Wiekiery: 5,
    KijeBojowe: 5,
    Kusze: 5,
    DługieŁuki: 5,
    KrótkieŁuki: 5,
    Strzałki: 5,
    Proce: 5,
    StylBroniDwóręcznych: 5,
    StylMieczaITarczy: 5,
    StylMieczaJednoręcznego: 5,
    StylDwóchBroni: 5,
  },
  skillPoints: 6,
},
  
  Kensai: {
    skills: {
    MieczePółtoraręczne: 5,
    MieczeDługie: 5,
    MieczeKrótkie: 5,
    Topory: 5,
    MieczeDwóręczne: 5,
    Katana: 5,
    Scimtar: 5,
    Sztylety: 5,
    MłotyWojenne: 5,
    Maczugi: 5,
    Włócznie: 5,
    Halabarda: 5,
    Korbacze: 5,
    Wiekiery: 5,
    KijeBojowe: 5,
    StylBroniDwóręcznych: 5,
    StylMieczaITarczy: 5,
    StylMieczaJednoręcznego: 5,
    StylDwóchBroni: 5,
  },
  skillPoints: 6,
},
  Krasnoludzki_Obrońca: {
    skills: {
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 4,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 4,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 6,
},
  Barbarzyńca: {
    skills: {
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 2,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 2,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 6,
},
  Łowca: {
    skills:{
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 2,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 2,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 4,
},
  Łucznik: {
    skills: {
    MieczePółtoraręczne: 1,
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Topory: 1,
    MieczeDwóręczne: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    MłotyWojenne: 1,
    Maczugi: 1,
    Włócznie: 1,
    Halabarda: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Kusze: 5,
    DługieŁuki: 5,
    KrótkieŁuki: 5,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 3,
  },
  skillPoints: 4,
},
  Prześladowca: {
    skills: {
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 2,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 2,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 3,
  },
  skillPoints: 4,
},
  Władca_Zwierząt: {
    skills: {
    Maczugi: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 4,
},
  Paladyn: {
    skills: {
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 2,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 2,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 4,
},
  Kawalerzysta: {
    skills: {
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 2,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 2,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 4,
},
  Inkwizytor: {
    skills: {
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 2,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 2,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 4,
},
  Łowca_Nieumarłych: {
    skills: {
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 2,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 2,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 4,
},
  Czarny_Strażnik: {
    skills: {
    MieczePółtoraręczne: 2,
    MieczeDługie: 2,
    MieczeKrótkie: 2,
    Topory: 2,
    MieczeDwóręczne: 2,
    Katana: 2,
    Scimtar: 2,
    Sztylety: 2,
    MłotyWojenne: 2,
    Maczugi: 2,
    Włócznie: 2,
    Halabarda: 2,
    Korbacze: 2,
    Wiekiery: 2,
    KijeBojowe: 2,
    Kusze: 2,
    DługieŁuki: 2,
    KrótkieŁuki: 2,
    Strzałki: 2,
    Proce: 2,
    StylBroniDwóręcznych: 2,
    StylMieczaITarczy: 2,
    StylMieczaJednoręcznego: 2,
    StylDwóchBroni: 2,
  },
  skillPoints: 4,
},
  Kapłan: {
    skills: {
    MłotyWojenne: 1,
    Maczugi: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Kapłan_Talosa: {
    skills: {
    MłotyWojenne: 1,
    Maczugi: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Kapłan_Helma: {
    skills: {
    MłotyWojenne: 1,
    Maczugi: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Kapłan_Lathandera: {
    skills: {
    MłotyWojenne: 1,
    Maczugi: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Kapłan_Tyra: {
    skills: {
    MłotyWojenne: 1,
    Maczugi: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Kapłan_Tempusa: {
    skills: {
    MłotyWojenne: 1,
    Maczugi: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Druid: {
    skills: {
    Scimtar: 1,
    Sztylety: 1,
    Włócznie: 1,
    Maczugi: 1,
    Strzałki: 1,
    KijeBojowe:1,
    Proce: 1,
  },
  skillPoints: 2,
},
  Totemiczny_Druid: {
    skills: {
    Scimtar: 1,
    Sztylety: 1,
    Włócznie: 1,
    Maczugi: 1,
    Strzałki: 1,
    KijeBojowe:1,
    Proce: 1,
  },
  skillPoints: 2,
},
  Zmiennokształtny: {
    skills: {
    Scimtar: 1,
    Sztylety: 1,
    Włócznie: 1,
    Maczugi: 1,
    Strzałki: 1,
    KijeBojowe:1,
    Proce: 1,
  },
  skillPoints: 2,
},
  Mściciel: {
    skills: {
    Scimtar: 1,
    Sztylety: 1,
    Włócznie: 1,
    Maczugi: 1,
    Strzałki: 1,
    KijeBojowe:1,
    Proce: 1,
  },
  skillPoints: 2,
},
  Mag: {
    skills: {
    Sztylety: 1,
    KijeBojowe: 1,
    Proce: 1,
    Strzałki: 1,
  },
  skillPoints: 1,
},
  Mag_Specjalista: {
    skills: {
    Sztylety: 1,
    KijeBojowe: 1,
    Proce: 1,
    Strzałki: 1,
  },
  skillPoints: 1,
},
  Dziki_Mag: {
    skills: {
    Sztylety: 1,
    KijeBojowe: 1,
    Proce: 1,
    Strzałki: 1,
  },
  skillPoints: 1,
},
  Łotrzyk: {
    skills: {
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    Maczugi: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Asasyn: {
    skills: {
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    Maczugi: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Łowca_Głów: {
    skills: {
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    Maczugi: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Zawadiaka: {
    skills: {
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    Maczugi: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Tancerz_Cienia: {
    skills: {
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    Maczugi: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Bard: {
    skills: {
    MieczePółtoraręczne: 1,
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Topory: 1,
    MieczeDwóręczne: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    MłotyWojenne: 1,
    Maczugi: 1,
    Włócznie: 1,
    Halabarda: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Bard_Ostrzy: {
    skills: {
    MieczePółtoraręczne: 1,
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Topory: 1,
    MieczeDwóręczne: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    MłotyWojenne: 1,
    Maczugi: 1,
    Włócznie: 1,
    Halabarda: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Błazen: {
    skills: {
    MieczePółtoraręczne: 1,
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Topory: 1,
    MieczeDwóręczne: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    MłotyWojenne: 1,
    Maczugi: 1,
    Włócznie: 1,
    Halabarda: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Skald: {
    skills: {
    MieczePółtoraręczne: 1,
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Topory: 1,
    MieczeDwóręczne: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    MłotyWojenne: 1,
    Maczugi: 1,
    Włócznie: 1,
    Halabarda: 1,
    Korbacze: 1,
    Wiekiery: 1,
    KijeBojowe: 1,
    Kusze: 1,
    KrótkieŁuki: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 2,
},
  Czarodziej: {
    skills: {
    Sztylety: 1,
    Strzałki: 1,
    Proce: 1,
    KijeBojowe: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 1,
},
  Uczeń_Smoka: {
    skills: {
    Sztylety: 1,
    Strzałki: 1,
    Proce: 1,
    KijeBojowe: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 1,
},
  Monk: {
    skills: {
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    Maczugi: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 3,
},
  Monk_Mrocznego_Księżyca: {
    skills: {
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    Maczugi: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 3,
},
  Monk_Słonecznej_Duszy: {
    skills: {
    MieczeDługie: 1,
    MieczeKrótkie: 1,
    Katana: 1,
    Scimtar: 1,
    Sztylety: 1,
    Maczugi: 1,
    Strzałki: 1,
    Proce: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 3,
},
  Szaman: {
    skills: {
    Sztylety: 1,
    Maczugi: 1,
    Włócznie: 1,
    Topory: 1,
    KijeBojowe: 1,
    Strzałki: 1,
    Proce: 1,
    KrótkieŁuki: 1,
    StylBroniDwóręcznych: 1,
    StylMieczaITarczy: 1,
    StylMieczaJednoręcznego: 1,
    StylDwóchBroni: 1,
  },
  skillPoints: 3,
},
};

const subclassesThievingAbilities: Record<string, { skills: Partial<ThievingAbilities>, skillPoints: number }> = {
  Łowca:{
    skills: {
      Ciche_Poruszanie: 55,
      Krycie_W_Cieniu: 55,
    },
    skillPoints: 0,
  },
  Łucznik:{
    skills: {
      Ciche_Poruszanie: 55,
      Krycie_W_Cieniu: 55,
    },
    skillPoints: 0,
  },
  Prześladowca:{
    skills: {
      Ciche_Poruszanie: 55,
      Krycie_W_Cieniu: 55,
    },
    skillPoints: 0,
  },
  Władca_Zwięrząt:{
    skills: {
      Ciche_Poruszanie: 55,
      Krycie_W_Cieniu: 55,
    },
    skillPoints: 0,
  },

  Bard:{
    skills: {
      Kradzież_Kieszonkowa: 60
    },
    skillPoints: 0,
  },
  Bard_Ostrzy:{
    skills: {
      Kradzież_Kieszonkowa: 60
    },
    skillPoints: 0,
  },
  Błazen:{
    skills: {
      Kradzież_Kieszonkowa: 60
    },
    skillPoints: 0,
  },
  Skald:{
    skills: {
      Kradzież_Kieszonkowa: 60
    },
    skillPoints: 0,
  },
  Monk:{
    skills: {
      Znajdywanie_Pułapek : 0,
      Ciche_Poruszanie: 0,
      Krycie_W_Cieniu: 0,
    },
    skillPoints: 0,
  },
  Monk_Morcznego_Księżyca:{
    skills: {
      Znajdywanie_Pułapek : 0,
      Ciche_Poruszanie: 0,
      Krycie_W_Cieniu: 0,
      Wykrywanie_Iluzji: 0,
    },
    skillPoints: 0,
  },
  Monk_Słonecznej_Duszy:{
    skills: {
      Znajdywanie_Pułapek : 0,
      Ciche_Poruszanie: 0,
      Krycie_W_Cieniu: 0,
    },
    skillPoints: 0,
  },
  Szaman: {
    skills: {
      Wykrywanie_Iluzji: 48,
    },
    skillPoints: 0,
  },


}

const raseBonusThievingAbilities: Record<string, { skills: Partial<ThievingAbilities>}> = {
  Człowiek : {
    skills: {
      Otwieranie_Zamków: 10,
      Kradzież_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pułapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pułapek: 0,
    }
  },
  Krasonlud : {
    skills: {
      Otwieranie_Zamków: 20,
      Kradzież_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pułapek: 20,
      Wykrywanie_Iluzji: 5,
      Rozstawianie_Pułapek: 10,
    }
  },
  Elf : {
    skills: {
      Otwieranie_Zamków: 5,
      Kradzież_Kieszonkowa: 20,
      Ciche_Poruszanie: 15,
      Krycie_W_Cieniu: 15,
      Znajdywanie_Pułapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pułapek: 0,
    }
  },
  Gnom : {
    skills: {
      Otwieranie_Zamków: 15,
      Kradzież_Kieszonkowa: 15,
      Ciche_Poruszanie: 15,
      Krycie_W_Cieniu: 10,
      Znajdywanie_Pułapek: 15,
      Wykrywanie_Iluzji: 10,
      Rozstawianie_Pułapek: 5,
    }
  },
  Pół_Elf : {
    skills: {
      Otwieranie_Zamków: 10,
      Kradzież_Kieszonkowa: 25,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 10,
      Znajdywanie_Pułapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pułapek: 0,
    }
  },
  Pół_Ork : {
    skills: {
      Otwieranie_Zamków: 10,
      Kradzież_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pułapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pułapek: 0,
    }
  },
  Niziołek : {
    skills: {
      Otwieranie_Zamków: 15,
      Kradzież_Kieszonkowa: 20,
      Ciche_Poruszanie: 20,
      Krycie_W_Cieniu: 20,
      Znajdywanie_Pułapek: 10,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pułapek: 0,
    }
  },
}


const Skills: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const selectedSubclass = characterData.subclasses;

  const availableSkills =
    (selectedSubclass && subclassProficiencies[selectedSubclass]?.skills) || {};

    const [availablePoints, setAvailablePoints] = useState(0);


    useEffect(() => {
      if (selectedSubclass) {
        const currentProficiencies = subclassProficiencies[selectedSubclass]?.skills || {};
        const currentPoints = subclassProficiencies[selectedSubclass]?.skillPoints || 0;
  
        const updatedSkills = { ...characterData.skills };
  
        Object.keys(currentProficiencies).forEach((skill) => {
          if (updatedSkills[skill as keyof WeaponProficiencys] === -1) {
            updatedSkills[skill as keyof WeaponProficiencys] = 0;
          }
        });
  
        setCharacterData((prevData) => ({
          ...prevData,
          skills: updatedSkills,
        }));

        setAvailablePoints(currentPoints);
      }
    }, [selectedSubclass]);

  const updateSkill = (skill: keyof WeaponProficiencys, change: number) => {
    setCharacterData((prevData) => {
      const currentValue = prevData.skills[skill];
      const maxValue = availableSkills[skill] ?? 0;

      if (
        currentValue + change >= 0 &&
        currentValue + change <= maxValue &&
        availablePoints - change >= 0
      ) {
        return {
          ...prevData,
          skills: {
            ...prevData.skills,
            [skill]: currentValue + change,
          },
        };
      }
      return prevData;
    });

    setAvailablePoints((prev) => prev - change);
  };

  return (
    <div>
      <h2>Wybierz Biegłóści</h2>
      <p>Pozostałe punkty: {availablePoints}</p>
      {selectedSubclass ? (
        <ul>
          {Object.entries(availableSkills).map(([skill, maxLevel]) => (
            <li key={skill}>
              {skill}: {characterData.skills[skill as keyof WeaponProficiencys]} / {maxLevel}
              <button
                onClick={() => updateSkill(skill as keyof WeaponProficiencys, 1)}
                disabled={
                  characterData.skills[skill as keyof WeaponProficiencys] >= maxLevel ||
                  availablePoints <= 0
                }
              >
                +
              </button>
              <button
                onClick={() => updateSkill(skill as keyof WeaponProficiencys, -1)}
                disabled={characterData.skills[skill as keyof WeaponProficiencys] <= 0}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Wybierz podklasę, aby zobaczyć dostępne biegłości.</p>
      )}
    </div>
  )
}

export default Skills;