import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';

const subclassOptions: { [key: string]: string[] } = {
  Wojownik: ['Berserker', 'Zabójca_Magów', 'Kensai', 'Krasnoludzki_Obrońca', 'Barbarzyńca'],
  Łowca: ['Łucznik', 'Prześladowca', 'Władca_Zwierząt'],
  Paladyn: ['Kawalerzysta', 'Inkwizytor', 'Łowca_Nieumarłych', 'Czarny_Strażnik'],
  Kleryk: ['Kapłan_Talosa', 'Kapłan_Helma', 'Kapłan_Lathandera', 'Kapłan_Tyra', 'Kapłan_Tempusa'],
  Druid: ['Totemiczny_Druid', 'Zmiennokształtny', 'Mściciel'],
  Mag: ['Mag_Specjalista', 'Dziki_Mag'],
  Łotrzyk: ['Asasyn', 'Łowca_Głów', 'Zawadiaka', 'Tancerz_Cienia'],
  Bard: ['Bard_Ostrzy', 'Błazen', 'Skald'],
  Czarodziej: ['Czarodziej', 'Uczeń_Smoka'],
  Monk: ['Monk_Mrocznego_Księżyca', 'Monk_Słonecznej_Duszy'],
  Shaman: ['Szaman'],
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
