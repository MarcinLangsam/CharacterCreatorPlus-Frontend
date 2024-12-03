import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';

const subclassOptions: { [key: string]: string[] } = {
  Wojownik: ['Wojownik', 'Berserker', 'Zabójca_Magów', 'Kensai', 'Krasnoludzki_Obrońca', 'Barbarzyńca'],
  Łowca: ['Łowca','Łucznik', 'Tropiciel', 'Władca_Zwierząt'],
  Paladyn: ['Paladyn','Kawalerzysta', 'Inkwizytor', 'Łowca_Nieumarłych', 'Czarny_Strażnik'],
  Kapłan: ['Kapłan','Kapłan_Talosa', 'Kapłan_Helma', 'Kapłan_Lathandera', 'Kapłan_Tyra', 'Kapłan_Tempusa'],
  Druid: ['Druid','Totemiczny_Druid', 'Zmiennokształtny', 'Mściciel'],
  Mag: ['Mag','Mag_Specjalista', 'Dziki_Mag'],
  Łotrzyk: ['Złodziej','Zabójca', 'Łowca_Nagród', 'Zawadiaka', 'Tancerz_Cieni'],
  Bard: ['Bard','Fechmistrz', 'Błazen', 'Skald'],
  Czarodziej: ['Czarownik', 'Uczeń_Smoka'],
  Monk: ['Mnich','Mnich_Ciemnego_Księżyca', 'Mnich_Słonecznej_Duszy'],
  Shaman: ['Shaman'],
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
    <div className="flex flex-col ml-4">
      <h2>Wybierz Podklasę</h2>
      {availableSubclasses().map((subclass) => (
        <button key={subclass} className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => setSubclass(subclass)}>
          {subclass}
        </button>
      ))}
    </div>
  );
};

export default SubclassSelector;
