import React, { useEffect, useState } from "react";
import { useExportDataContext } from "../context/ExportDataContext";
import { useCharacterContext } from "../context/CharacterContext";
import { WeaponProficiencys } from "../types/CharacterData";

const ProficiencysMenu: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();
    const { exportData, setExportData } = useExportDataContext();
    const selectedSubclass = characterData.subclasses;

    const [backendProficiencys, setBackendProficiencys] = useState<any>({});
    const [proficiencysPoints, setProficiencysPoints] = useState(0);
      
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
      
            setBackendProficiencys(selectedProficiencys || {});
            
            const updatedSkills = { ...characterData.skills };
            
      
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
      
            setCharacterData((prev) => ({
              ...prev,
              skills: updatedSkills,
            }));
    
            setProficiencysPoints(selectedProficiencys.skillPoints || 0)
            
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

    return(
        <>
            <div className="proficiencysBackground">
                <p className="plainTextBig">Pozostałe punkty biegłości: {proficiencysPoints}</p>
                    {selectedSubclass ? (
                        <div>
                        {Object.entries(characterData.skills)
                        .filter(([skill, value]) => backendProficiencys[skill] !== -1)
                        .map(([skill, value]) => (
                        <div key={skill}>
                            <span className='plainText'>{skill}: {value}</span>
                            <button className="statsButton" onClick={() => increaseSkill(skill as keyof WeaponProficiencys)}>+</button>
                            <button className="statsButton" onClick={() => decreaseSkill(skill as keyof WeaponProficiencys)}>-</button>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="plainTextBig">Wybierz podklasę, aby zobaczyć dostępne biegłości.</p>
                    )}
            </div>
        </>
    )
}

export default ProficiencysMenu;