import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import SubclassSelector from "./SubclassSelector";
import ClassHelpPopup from "./popups/ClassHelpPopup";

const classesOptions: { [key: string]: string[] } = {
    Człowiek: ['Wojownik', 'Łowca', 'Paladyn', 'Kapłan', 'Druid', 'Mag', 'Złodziej', 'Bard', 'Czarownik', 'Mnich', 'Szaman'],
    Pół_Elf: ['Wojownik', 'Łowca', 'Kapłan', 'Druid', 'Mag', 'Złodziej', 'Bard', 'Czarownik', 'Szaman'],
    Elf: ['Wojownik', 'Łowca', 'Kapłan', 'Mag', 'Złodziej', 'Czarownik'],
    Krasnolud: ['Wojownik', 'Kapłan', 'Złodziej'],
    Niziołek: ['Wojownik', 'Kapłan', 'Złodziej'],
    Gnom: ['Wojownik', 'Kapłan', 'Mag', 'Złodziej'],
    Pół_Ork: ['Wojownik', 'Kapłan', 'Złodziej', 'Szaman'],
  };

const baseThac0ForClasses = {
  Wojownik: 14,
  Łowca: 14,
  Paladyn: 14,
  Kapłan: 16,
  Druid: 16,
  Mag: 18,
  Złodziej: 17,
  Bard: 17,
  Czarownik: 18,
  Mnich: 14,
  Szaman: 18,
}

const baseLevelForClasses = {
  Wojownik: 7,
  Łowca: 7,
  Paladyn: 7,
  Kapłan: 7,
  Druid: 8,
  Mag: 7,
  Złodziej: 8,
  Bard: 8,
  Czarownik: 7,
  Mnich: 7,
  Szaman: 7,
}

const classes: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext();
    const [classDescription, setClassDescription] = useState<string>();

    const handelBackendFile = async (className: string) => {
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
  

    const handleClassesChange = (classes: string, subclasses: string) => {
        const thac0 = baseThac0ForClasses[classes as keyof typeof baseThac0ForClasses] ?? 17;
        const level = baseLevelForClasses[classes as keyof typeof baseLevelForClasses] ?? 7;

        handelBackendFile(classes)
        setCharacterData((prevData) => ({
            ...prevData,
            classes: classes,
            subclasses: subclasses,
            baseThac0: thac0,
            level: level,
            wizardSpells: [],
            clericSpells: [],
        }));
    };

    const availableClasses = () => {
        const selectedClass = characterData.classes;
        const selectedRace = characterData.race;
    
        if (!selectedRace) return [];
    
        const classes = classesOptions[selectedRace] || [];
    
        return classes;
      }; 

    return(
    <>
      <div className="d-flex flex-row">
        <div style={{ marginTop: "5px" }}><ClassHelpPopup/></div>
        <div className="d-flex flex-col creation-background">
            {availableClasses().map((classes) => (
                <button className="creation-button" onClick={() => handleClassesChange(classes,'')}>
                  {classes}
                </button>
            ))}
            {characterData.classes != "noneClass" && (
              <p className="chosen-creation-data">Wybrano: {characterData.classes}</p>
            )}
        </div>
        <SubclassSelector />
      </div>
    </>
    )
}

export default classes;