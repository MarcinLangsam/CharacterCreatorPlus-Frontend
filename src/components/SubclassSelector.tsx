import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';

const subclassOptions: { [key: string]: string[] } = {
  Wojownik: ['Wojownik', 'Berserker', 'Zabójca_Magów', 'Kensai', 'Krasnoludzki_Obrońca', 'Barbarzyńca'],
  Łowca: ['Łowca','Łucznik', 'Tropiciel', 'Władca_Zwierząt'],
  Paladyn: ['Paladyn','Kawalerzysta', 'Inkwizytor', 'Łowca_Nieumarłych', 'Czarny_Strażnik'],
  Kapłan: ['Kapłan','Kapłan_Talosa', 'Kapłan_Helma', 'Kapłan_Lathandera', 'Kapłan_Tyra', 'Kapłan_Tempusa'],
  Druid: ['Druid','Totemiczny_Druid', 'Zmiennokształtny', 'Mściciel'],
  Mag: ['Mag','Mag_Specjalista', 'Dziki_Mag'],
  Złodziej: ['Złodziej','Zabójca', 'Łowca_Nagród', 'Zawadiaka', 'Tancerz_Cieni'],
  Bard: ['Bard','Fechmistrz', 'Błazen', 'Skald'],
  Czarownik: ['Czarownik', 'Uczeń_Smoka'],
  Mnich: ['Mnich','Mnich_Ciemnego_Księżyca', 'Mnich_Słonecznej_Duszy'],
  Szaman: ['Szaman'],
};

const SubclassSelector: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();

  const setSubclass = (subclasses: string) => {
    setCharacterData((prevData) => ({
      ...prevData,
      subclasses: subclasses,
    }));
  };

  const availableSubclasses = () => {
    const selectedClass = characterData.classes;
    const selectedRace = characterData.race;

    if (!selectedClass) return [];

    const subclasses = subclassOptions[selectedClass] || [];

    if (selectedClass === "Wojownik" && selectedRace !== "Krasnolud") {
      return subclasses.filter((subclass) => subclass !== "Krasnoludzki_Obrońca");
    }

    return subclasses;
  };

  return (
    <div className="flex flex-col secondaryBackground">
      {availableSubclasses().map((subclass) => (
        <button key={subclass} className="tertiaryText" onClick={() => setSubclass(subclass)}>
          {subclass}
        </button>
      ))}
    </div>
  );
};

export default SubclassSelector;
