import React, { useEffect, useState } from "react";
import { useCharacterContext, defaultThievingAbilities } from "../context/CharacterContext";
import { ThievingAbilities, WeaponProficiencys } from "../types/CharacterData";
import StatControl from "./ProficiencysControl";

const raseBonusThievingAbilities: Record<string, { skillsThief: Partial<ThievingAbilities>}> = {
  Człowiek : {
    skillsThief: {
      Otwieranie_Zamkow: 10,
      Kradziez_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pulapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
  Krasonlud : {
    skillsThief: {
      Otwieranie_Zamkow: 20,
      Kradziez_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pulapek: 20,
      Wykrywanie_Iluzji: 5,
      Rozstawianie_Pulapek: 10,
    }
  },
  Elf : {
    skillsThief: {
      Otwieranie_Zamkow: 5,
      Kradziez_Kieszonkowa: 20,
      Ciche_Poruszanie: 15,
      Krycie_W_Cieniu: 15,
      Znajdywanie_Pulapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
  Gnom : {
    skillsThief: {
      Otwieranie_Zamkow: 15,
      Kradziez_Kieszonkowa: 15,
      Ciche_Poruszanie: 15,
      Krycie_W_Cieniu: 10,
      Znajdywanie_Pulapek: 15,
      Wykrywanie_Iluzji: 10,
      Rozstawianie_Pulapek: 5,
    }
  },
  Pół_Elf : {
    skillsThief: {
      Otwieranie_Zamkow: 10,
      Kradziez_Kieszonkowa: 25,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 10,
      Znajdywanie_Pulapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
  Pół_Ork : {
    skillsThief: {
      Otwieranie_Zamkow: 10,
      Kradziez_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pulapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
  Niziołek : {
    skillsThief: {
      Otwieranie_Zamkow: 15,
      Kradziez_Kieszonkowa: 20,
      Ciche_Poruszanie: 20,
      Krycie_W_Cieniu: 20,
      Znajdywanie_Pulapek: 10,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
}



const Skills: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const selectedSubclass = characterData.subclasses;
  const selectedRace = characterData.race;

  const [backendProficiencys, setBackendProficiencys] = useState<any>({});
  const [backednThievingAbilities, setBackendThievingAbilities] = useState<any>({});
  const [proficiencysPoints, setProficiencysPoints] = useState(0);
  const [ThievingAbilitiesPoints, setThievingAbilitiesPoints] = useState(0);


  useEffect(() => {
    const fetchAndInitializeData = async () => {
      try {
        const proficiencysResponse = await fetch("http://localhost:3000/proficiencystosubclassdata");
        if (!proficiencysResponse.ok) {
          throw new Error(`HTTP error! status: ${proficiencysResponse.status}`);
        }
        const proficiencysData = await proficiencysResponse.json();
        const selectedProficiencys = proficiencysData.find(
          (data: { subclass: string | undefined }) => data.subclass === selectedSubclass
        );
  
        const thievingResponse = await fetch("http://localhost:3000/thievingabilitiestosubclassdata");
        if (!thievingResponse.ok) {
          throw new Error(`HTTP error! status: ${thievingResponse.status}`);
        }
        const thievingData = await thievingResponse.json();
        const selectedThievingAbilities = thievingData.find(
          (data: { subclass: string | undefined }) => data.subclass === selectedSubclass
        );
        console.log(selectedProficiencys)
        console.log(selectedThievingAbilities)
  
        setBackendProficiencys(selectedProficiencys || {});
        setBackendThievingAbilities(selectedThievingAbilities || {});
  
        const updatedSkills = { ...characterData.skills };
        const updatedThievingSkills = { ...characterData.skillsThief };

        /*const resetSkills = () => {
          const resetSkills = Object.keys(characterData.skills).reduce((acc, skill) => {
            acc[skill as keyof WeaponProficiencys] = -1;
            return acc;
          }, {} as WeaponProficiencys);

          const resetThievingSkills = Object.keys(characterData.skillsThief).reduce((acc, skillsThief) => {
            acc[skillsThief as keyof ThievingAbilities] = -1;
            return acc;
          }, {} as ThievingAbilities);
      
          setCharacterData((prev) => ({
            ...prev,
            skills: resetSkills,
            skillsThief: resetThievingSkills,
          }));
        };

        resetSkills();*/
        
  
        if (selectedProficiencys) {
          Object.keys(selectedProficiencys).forEach((key) => {
            if (key !== "skillPoints" && key !== "subclass" && key !== "id") {
              const maxLevel = selectedProficiencys[key];
              if (maxLevel !== -1) {
                updatedSkills[key as keyof WeaponProficiencys] = 0;
              }
            }
          });
        }

        if (selectedThievingAbilities) {
          Object.keys(selectedThievingAbilities).forEach((key) => {
            if (key !== "skillPointsThief" && key !== "subclass" && key !== "id") {
              const minLevel = selectedThievingAbilities[key];
              if (minLevel !== -1) {
                updatedThievingSkills[key as keyof ThievingAbilities] = minLevel;
              }
            }
          });
        }
  
        setCharacterData((prev) => ({
          ...prev,
          skills: updatedSkills,
          skillsThief: updatedThievingSkills
        }));

        setProficiencysPoints(selectedProficiencys.skillPoints || 0)
        setThievingAbilitiesPoints(selectedThievingAbilities.skillPointsThief || 0)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchAndInitializeData();
  }, [selectedSubclass]);

  const increaseSkill = (skill: keyof WeaponProficiencys) => {
    const maxLevel = backendProficiencys[skill];
    if (proficiencysPoints > 0 && characterData.skills[skill] < maxLevel) {
      setCharacterData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skill]: prev.skills[skill] + 1,
        },
      }));
      setProficiencysPoints((prev) => prev - 1);
    }
  };

  const decreaseSkill = (skill: keyof WeaponProficiencys) => {
    if (characterData.skills[skill] > 0) {
      setCharacterData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skill]: prev.skills[skill] - 1,
        },
      }));
      setProficiencysPoints((prev) => prev + 1);
    }
  };


  const increaseThievingSkills = (skillsThief: keyof ThievingAbilities) => {
    if(ThievingAbilitiesPoints > 0) {
      setCharacterData((prev) => ({
        ...prev,
        skillsThief: {
          ...prev.skillsThief,
          [skillsThief]: prev.skillsThief[skillsThief] + 1,
        },
      }));
      setThievingAbilitiesPoints((prev) => prev - 1);
    }
  };

  const decreaseThievingSkills = (skillsThief: keyof ThievingAbilities) => {
    const minLevel = backednThievingAbilities[skillsThief];
    if (characterData.skillsThief[skillsThief] > minLevel) {
      setCharacterData((prev) => ({
        ...prev,
        skillsThief: {
          ...prev.skillsThief,
          [skillsThief]: prev.skillsThief[skillsThief] - 1,
        },
      }));
      setThievingAbilitiesPoints((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h2>Wybierz Biegłóści</h2>
      <p>Pozostałe punkty: {proficiencysPoints}</p>
      {selectedSubclass ? (
          <div>
          {Object.entries(characterData.skills)
          .filter(([skill, value]) => backendProficiencys[skill] !== -1)
          .map(([skill, value]) => (
            <div key={skill}>
              <span>{skill}: {value}</span>
              <button onClick={() => increaseSkill(skill as keyof WeaponProficiencys)}>+</button>
              <button onClick={() => decreaseSkill(skill as keyof WeaponProficiencys)}>-</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Wybierz podklasę, aby zobaczyć dostępne biegłości.</p>
      )}
      <br />
      <br />
      <br />
      <div>

        <h3>Umiejętności złodziejskie:</h3>
        <p>Punkty do rozdania: {ThievingAbilitiesPoints}</p>
        {selectedSubclass ? (
          <div>
          {Object.entries(characterData.skillsThief)
          .filter(([skillsThief, value]) => backednThievingAbilities[skillsThief] !== -1)
          .map(([skillsThief, value]) => (
            
            <div key={skillsThief}>
              <span>{skillsThief}: {value}</span>
              <button onClick={() => increaseThievingSkills(skillsThief as keyof ThievingAbilities)}>+</button>
              <button onClick={() => decreaseThievingSkills(skillsThief as keyof ThievingAbilities)}>-</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Wybierz podklasę, aby zobaczyć dostępne umiejętności złodziejskie.</p>
      )}

    </div>
    </div>
  )
}

export default Skills;