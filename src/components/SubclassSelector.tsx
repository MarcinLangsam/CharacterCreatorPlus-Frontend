import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';

const subclassOptions: { [key: string]: string[] } = {
  Wojownik: ['Wojownik', 'Berserker', 'Zabójca_Magów', 'Kensai', 'Krasnoludzki_Obrońca', 'Barbarzyńca'],
  Łowca: ['Łowca','Łucznik', 'Tropiciel', 'Władca_Zwierząt'],
  Paladyn: ['Paladyn','Kawalerzysta', 'Inkwizytor', 'Łowca_Nieumarłych', 'Czarny_Strażnik'],
  Kapłan: ['Kapłan','Kapłan_Talosa', 'Kapłan_Helma', 'Kapłan_Lathandera', 'Kapłan_Tyra', 'Kapłan_Tempusa'],
  Druid: ['Druid','Totemiczny_Druid', 'Zmiennokształtny', 'Mściciel'],
  Mag: ['Mag','Mistrz_Odrzucania', 'Mistrz_Przywołań', "Mistrz_Pozanania", "Mistrz_Zauroczeń", "Ilizjonista", "Mistrz_Inwokacji", "Nekromanta", "Mistrz_Przemian", 'Dziki_Mag'],
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

    if (selectedClass === "Mag" && selectedRace === "Elf") {
      const excludedSubclasses = ["Mag", "Mistrz_Odrzucania", "Mistrz_Przywołań", "Ilizjonista", "Mistrz_Inwokacji", "Nekromanta", "Mistrz_Przemian"];
      return subclasses.filter((subclass) => !excludedSubclasses.includes(subclass));
    }

    if (selectedClass === "Mag" && selectedRace === "Pół_Elf") {
      const excludedSubclasses = ["Mag", "Mistrz_Odrzucania", "Ilizjonista", "Mistrz_Inwokacji", "Nekromanta"];
      return subclasses.filter((subclass) => !excludedSubclasses.includes(subclass));
    }

    if (selectedClass === "Mag" && selectedRace === "Gnom") {
      const excludedSubclasses = ["Mag",'Mistrz_Odrzucania', 'Mistrz_Przywołań', "Mistrz_Pozanania", "Mistrz_Zauroczeń", "Mistrz_Inwokacji", "Nekromanta", "Mistrz_Przemian", 'Dziki_Mag'];
      return subclasses.filter((subclass) => !excludedSubclasses.includes(subclass));
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
