import React, { useEffect, useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';

const subclassOptions: { [key: string]: string[] } = {
  Wojownik: ['Wojownik', 'Berserker', 'Zabójca_Magów', 'Kensai', 'Krasnoludzki_Obrońca', 'Barbarzyńca'],
  Łowca: ['Łowca','Łucznik', 'Tropiciel', 'Władca_Zwierząt'],
  Paladyn: ['Paladyn','Kawaler', 'Inkwizytor', 'Łowca_Nieumarłych', 'Czarny_Strażnik'],
  Kapłan: ['Kapłan','Kapłan_Talosa', 'Kapłan_Helma', 'Kapłan_Lathandera', 'Kapłan_Tyra', 'Kapłan_Tempusa'],
  Druid: ['Druid','Totemiczny_Druid', 'Zmiennokształtny', 'Mściciel'],
  Mag: ['Mag','Mistrz_Odrzucania', 'Mistrz_Przywołań', "Mistrz_Pozanania", "Mistrz_Zauroczeń", "Iluzjonista", "Mistrz_Inwokacji", "Nekromanta", "Mistrz_Przemian", 'Dziki_Mag'],
  Złodziej: ['Złodziej','Zabójca', 'Łowca_Nagród', 'Zawadiaka', 'Tancerz_Cieni'],
  Bard: ['Bard','Fechmistrz', 'Błazen', 'Skald'],
  Czarownik: ['Czarownik', 'Uczeń_Smoka'],
  Mnich: ['Mnich','Mnich_Ciemnego_Księżyca', 'Mnich_Słonecznej_Duszy'],
  Szaman: ['Szaman'],
};

const classThac0Bonuses = {
  Zawadiaka: 2,
  Zabójca: 1,
  Kensai: 2,
  Skald: 1,
}

const classACBonuses = {
  Mnich: 4,
  Mnich_Ciemnego_Księżyca: 4,
  Mnich_Słonecznej_Duszy: 4,
  Zawadiaka: 2,
  Uczeń_Smoka: 2,
  Kensai: 2,
}

const SubclassSelector: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const [classDescription, setClassDescription] = useState<string>();

  const handelBackendFile = async (className: string) => {
    if(className === "") {setClassDescription(""); return;}

    try {
      const response = await fetch(`http://localhost:3000/OpisyKlas/${className}.txt`)
      if(!response.ok) {
        throw new Error("Failed to fetch file")
      }
    const classDescription = await response.text();
    setClassDescription(classDescription);
      

    }
    catch (error) {
      console.error('Error handling file:', error)
      setClassDescription("");
    }
  }

  const setSubclass = (subclasses: string) => {
    handelBackendFile(subclasses)
    const Thaco0Bonus = classThac0Bonuses[characterData.subclasses as keyof typeof classThac0Bonuses] ?? 0;
    const ACBonus = classACBonuses[characterData.subclasses as keyof typeof classACBonuses] ?? 0;
    let hpdice = 0
    if(subclasses === "Krasnoludzki_Obrońca" || subclasses === "Barbarzyńca")
      {hpdice = 12}

    if(subclasses === "Wojownik" || subclasses === "Berserker" || subclasses === "Zabójca_Magów" || subclasses === "Kensai" || 
      subclasses === "Łowca" || subclasses === "Łucznik" || subclasses === "Tropiciel" || subclasses === "Władca_Zwierząt" ||
      subclasses === "Paladyn" || subclasses === "Kawaler" || subclasses === "Inkwizytor" || subclasses === "Łowca_Nieumarłych" || subclasses === "Czarny_Strażnik"
      )
        {hpdice = 10}

    if(subclasses === "Kapłan" || subclasses === "Kapłan_Talosa" || subclasses === "Kapłan_Helma" || subclasses === "Kapłan_Lathandera" || subclasses === "Kapłan_Tyra" || subclasses === "Kapłan_Tempusa" || 
       subclasses === "Druid" || subclasses === "Totemiczny_Druid" || subclasses === "Zmiennokształtny" || subclasses === "Mściciel" || 
       subclasses === "Mnich" || subclasses === "Mnich_Ciemnego_Księżyca" || subclasses === "Mnich_Słonecznej_Duszy" ||
       subclasses === "Szaman"
      )
      {hpdice = 8}

    if(subclasses === "Złodziej" || subclasses === "Zabójca" || subclasses === "Łowca_Nagród" || subclasses === "Zawadiaka" || subclasses === "Tancerz_Cieni" || 
      subclasses === "Bard" || subclasses === "Fechmistrz" || subclasses === "Błazen" || subclasses === "Skald" ||
      subclasses === "Uczeń_Smoka"
      )
      {hpdice = 6}

    if(subclasses === "Mag" || subclasses === "Mistrz_Odrzucania" || subclasses === "Mistrz_Przywołań" || subclasses === "Mistrz_Pozanania" || subclasses === "Mistrz_Zauroczeń" || subclasses === "Iluzjonista" || subclasses === "Mistrz_Inwokacji" || subclasses === "Nekromanta" || subclasses === "Mistrz_Przemian" || subclasses === "Dziki_Mag" ||
      subclasses === "Czarownik"
      )
      {hpdice = 4}


    setCharacterData((prevData) => ({
      ...prevData,
      subclasses: subclasses,
      classBonusThac0: Thaco0Bonus,
      classBonusAC: ACBonus,
      HPdice: hpdice,
      clericSpells: [],
      wizardSpells: [],
    }));
  };

  useEffect(() => {
    handelBackendFile(characterData.subclasses)
  }, [characterData.subclasses])

  const availableSubclasses = () => {
    const selectedClass = characterData.classes;
    const selectedRace = characterData.race;

    if (!selectedClass) return [];

    const subclasses = subclassOptions[selectedClass] || [];

    if (selectedClass === "Wojownik" && selectedRace !== "Krasnolud") {
      return subclasses.filter((subclass) => subclass !== "Krasnoludzki_Obrońca");
    }

    if (selectedClass === "Mag" && selectedRace === "Elf") {
      const excludedSubclasses = ["Mag", "Mistrz_Odrzucania", "Mistrz_Przywołań", "Iluzjonista", "Mistrz_Inwokacji", "Nekromanta", "Mistrz_Przemian"];
      return subclasses.filter((subclass) => !excludedSubclasses.includes(subclass));
    }

    if (selectedClass === "Mag" && selectedRace === "Pół_Elf") {
      const excludedSubclasses = ["Mag", "Mistrz_Odrzucania", "Iluzjonista", "Mistrz_Inwokacji", "Nekromanta"];
      return subclasses.filter((subclass) => !excludedSubclasses.includes(subclass));
    }

    if (selectedClass === "Mag" && selectedRace === "Gnom") {
      const excludedSubclasses = ["Mag",'Mistrz_Odrzucania', 'Mistrz_Przywołań', "Mistrz_Pozanania", "Mistrz_Zauroczeń", "Mistrz_Inwokacji", "Nekromanta", "Mistrz_Przemian", 'Dziki_Mag'];
      return subclasses.filter((subclass) => !excludedSubclasses.includes(subclass));
    }

    return subclasses;
  };

  return (
    <>
      <div className="d-flex flex-col creation-background">
        {availableSubclasses().map((subclass) => (
          <button key={subclass} className="creation-button" onClick={() => setSubclass(subclass)}>
            {subclass}
          </button>
        ))}
        {characterData.subclasses != "" && (
          <p className='chosen-creation-data'>Wybrano: {characterData.subclasses}</p>
        )}
      </div>
      <div className="creation-background">
      <span style={{ whiteSpace: "pre-wrap" }}>{classDescription}</span>
      </div>
    </>
  );
};

export default SubclassSelector;
