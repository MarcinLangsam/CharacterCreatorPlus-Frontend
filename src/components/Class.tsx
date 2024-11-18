import React from "react";
import { useCharacterContext } from "../context/CharacterContext";
import SubclassSelector from "./SubclassSelector";

const classesOptions: { [key: string]: string[] } = {
    Człowiek: ['Wojownik', 'Łowca', 'Paladyn', 'Kapłan', 'Druid', 'Mag', 'Łotrzyk', 'Bard', 'Czarodziej', 'Monk', 'Szaman'],
    Pół_Elf: ['Wojownik', 'Łowca', 'Kapłan', 'Druid', 'Mag', 'Łotrzyk', 'Bard', 'Czarodziej', 'Szaman'],
    Elf: ['Wojownik', 'Łowca', 'Kapłan', 'Mag', 'Łotrzyk', 'Czarodziej'],
    Krasnolud: ['Wojownik', 'Kapłan', 'Łotrzyk'],
    Niziołek: ['Wojownik', 'Kapłan', 'Łotrzyk'],
    Gnom: ['Wojownik', 'Kapłan', 'Mag', 'Łotrzyk'],
    Pół_Ork: ['Wojownik', 'Kapłan', 'Łotrzyk', 'Szaman'],
  };

const classes: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext();

    const handleClassesChange = (classes: string, subclasses: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            classes: classes,
            subclasses: subclasses
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
    <div className="flex flex-row">
        <div className="flex flex-col">
            <h2>Wybierz Klasę</h2>
            {availableClasses().map((classes) => (
                <button key={classes} className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange(classes,'')}>
                {classes}
            </button>
            ))}
        </div>
        <SubclassSelector />
    </div>
    )
}

export default classes;