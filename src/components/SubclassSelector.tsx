import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';

const subclassOptions: { [key: string]: string[] } = {
  Wojownik: ['Berserker', 'Zabójca Magów', 'Kensai', 'Krasnoludzki obrońca', 'Barbarzyńca'],
  Łowca: ['Łócznik', 'Prześladowca', 'Władca Zwierząt'],
  Paladyn: ['Kawalerzysta', 'Inkwizytor', 'Łowca Nieumarłych', 'Czarny Strażnik'],
  Kleryk: ['Kapłan Talosa', 'Kapłan Helma', 'Kapłan Lathandera', 'Kapłan Tyra', 'Kapłan Tempusa'],
  Druid: ['Totemiczny Druid', 'Zmiennokształtny', 'Mściciel'],
  Mag: ['Mag Specjalista', 'Dziki Mag'],
  Łotrzyk: ['Asasyn', 'Łowca Głów', 'Zawadiaka', 'Tancerz Cienia'],
  Bard: ['Bard Ostrzy', 'Błazen', 'Skald'],
  Czarodziej: ['Czarodziej', 'Uczeń Smoka'],
  Monk: ['Monk Mrocznego Księżyca', 'Monk Słonecznej Duszy'],
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

  const subclasses = characterData.classes ? subclassOptions[characterData.classes] : [];

  if (!subclasses || subclasses.length === 0) return null;

  return (
    <div className="flex flex-col ml-4">
      <h2>Wybierz Podklasę</h2>
      {subclasses.map((subclass) => (
        <button key={subclass} className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => setSubclass(subclass)}>
          {subclass}
        </button>
      ))}
    </div>
  );
};

export default SubclassSelector;
