import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import SubclassSelector from "./SubclassSelector";

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
        let hpdice = 0
        if(classes === "Wojownik" || classes === "Paladyn" || classes === "Łowca"){hpdice = 10}
        if(classes === "Kapłan" || classes === "Druid" || classes === "Mnich" || classes === "Szaman"){hpdice = 8}
        if(classes === "Złodziej" || classes === "Bard"){hpdice = 6}
        if(classes === "Mag" || classes === "Czarownik"){hpdice = 4}

        const thac0 = baseThac0ForClasses[classes as keyof typeof baseThac0ForClasses] ?? 17;
        const level = baseLevelForClasses[classes as keyof typeof baseLevelForClasses] ?? 7;

        handelBackendFile(classes)
        setCharacterData((prevData) => ({
            ...prevData,
            classes: classes,
            subclasses: subclasses,
            HPdice: hpdice,
            baseThac0: thac0,
            level: level,
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
      <h2 className="secondary-text">Wybierz Klasę</h2>
      {characterData.classes != "noneClass" && (
        <h2 className="secondary-text">{" =======> "}Wybierz Podklasę</h2>
      )}
    </div>
    
      <div className="d-flex flex-row">
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
          <div className="creation-background">
          <span style={{ whiteSpace: "pre-wrap" }}>{classDescription}</span>
          </div>
      </div>
    </>
    )
}

export default classes;