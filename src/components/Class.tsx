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

        handelBackendFile(classes)
        setCharacterData((prevData) => ({
            ...prevData,
            classes: classes,
            subclasses: subclasses,
            HPdice: hpdice
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
      <h2 className="secondaryText">Wybierz Klasę</h2>
      <div className="flex flex-row">
          <div className="flex flex-col secondaryBackground">
              
              {availableClasses().map((classes) => (
                  <button className="tertiaryText" onClick={() => handleClassesChange(classes,'')}>
                  {classes}
              </button>
              ))}
          </div>
          <SubclassSelector />
          <div className="descriptionBackground">
            <p className="plainText">{classDescription}</p>
          </div>
      </div>
    </>
    )
}

export default classes;