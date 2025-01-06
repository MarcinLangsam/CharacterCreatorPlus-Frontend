import React, { useEffect, useState } from "react";
import { ThievingAbilities } from "../types/CharacterData";
import { useCharacterContext } from "../context/CharacterContext";
import { useExportDataContext } from "../context/ExportDataContext";


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

type ThievingAbilityName =
  | 'Kradziez_Kieszonkowa'
  | 'Otwieranie_Zamkow'
  | 'Znajdywanie_Pulapek'
  | 'Ciche_Poruszanie'
  | 'Krycie_W_Cieniu'
  | 'Rozstawianie_Pulapek';

const ThievingAbilitiesMenu: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();
    const { exportData, setExportData } = useExportDataContext();
    const selectedSubclass = characterData.subclasses;
    
    const [backednThievingAbilities, setBackendThievingAbilities] = useState<any>({});
    const [ThievingAbilitiesPoints, setThievingAbilitiesPoints] = useState(0);
      
    useEffect(() => {
        const fetchAndInitializeData = async () => {
          try {
            const thievingResponse = await fetch("http://localhost:3000/thievingabilitiestosubclassdata");
            if (!thievingResponse.ok) {
              throw new Error(`HTTP error! status: ${thievingResponse.status}`);
            }
            const thievingData = await thievingResponse.json();
            const selectedThievingAbilities = thievingData.find(
              (data: { subclass: string | undefined }) => data.subclass === selectedSubclass
            );
    
            setBackendThievingAbilities(selectedThievingAbilities || {});
            
            const updatedThievingSkills = { ...characterData.skillsThief };
            
    
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
              skillsThief: updatedThievingSkills
            }));
    
            setThievingAbilitiesPoints(selectedThievingAbilities.skillPointsThief || 0)
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchAndInitializeData();
    }, [selectedSubclass]);


    

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

          setExportData((prev) => ({
            ...prev,
            skillsThief: {
              ...prev.skillsThief,
              [skillsThief]: prev.skillsThief[skillsThief] + 1 + getThievingAbilityBonus(skillsThief),
            }
          }))
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

    const getThievingSkillsForRace = (race: string): Partial<ThievingAbilities> => {
     const raceData = raseBonusThievingAbilities[race];
      
      if (!raceData) {
        throw new Error(`Invalid race: ${race}`);
      }
      
      return raceData.skillsThief;
    };




    function getThievingAbilityBonus(
      abilityName: string,
    ): number {
      const bonusMapping: Record<ThievingAbilityName, string> = {
        Kradziez_Kieszonkowa: 'Kradzież_KieszonkowaBonus',
        Otwieranie_Zamkow: 'Otwieranie_ZamkówBonus',
        Znajdywanie_Pulapek: 'Znajdywanie_PułapekBonus',
        Ciche_Poruszanie: 'Ciche_PoruszanieBonus',
        Krycie_W_Cieniu: 'Krycie_W_CieniuBonus',
        Rozstawianie_Pulapek: 'Rozstawianie_PułapekBonus',
      };
    
      if (abilityName in bonusMapping) {
        const bonusKey = bonusMapping[abilityName as ThievingAbilityName];
        return characterData.skillsThief[bonusKey as keyof ThievingAbilities] || 0;
      }
    
      return 0;
    }

    return(
        <>
        <div className="proficiencysBackground">
          <p className="plainTextBig">Pozostałe punkty umiejętności złodziejskich: {ThievingAbilitiesPoints}</p>
          {selectedSubclass ? (
            <div>
              {Object.entries(characterData.skillsThief)
                .filter(([skillsThief, value]) => backednThievingAbilities[skillsThief] !== -1)
                .map(([skillsThief, value]) => {
                  const race = characterData.race || "Człowiek";
                  const raceBonuses = getThievingSkillsForRace(race);
                  const raceBonus = raceBonuses[skillsThief as keyof ThievingAbilities] || 0;
                  const attributeBonus = getThievingAbilityBonus(skillsThief)
                  
                  return (
                    <div key={skillsThief}>
                      <span className='plainText'>
                        {skillsThief}: {value} + {raceBonus} + {attributeBonus} = {value+raceBonus+attributeBonus}
                      </span>
                      <button className="statsButton" onClick={() => increaseThievingSkills(skillsThief as keyof ThievingAbilities)}>+</button>
                      <button className="statsButton" onClick={() => decreaseThievingSkills(skillsThief as keyof ThievingAbilities)}>-</button>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="plainTextBig">Wybierz podklasę, aby zobaczyć dostępne umiejętności złodziejskie.</p>
          )}
          </div>
        </>
    )
}

export default ThievingAbilitiesMenu;