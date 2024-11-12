import React from "react";
import { useCharacterContext } from "../context/CharacterContext";

const Race: React.FC = () => {

    const {characterData, setCharacterData} = useCharacterContext();

    const handleRaceChange = (race: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            race: race,
        }));
    };


    return(
    <div>
        <h2>Choose Race</h2>
        <button onClick={() => handleRaceChange('Human')}>Human</button>
        <button onClick={() => handleRaceChange('Elf')}>Elf</button>
        <button onClick={() => handleRaceChange('Half-Elf')}>Half-Elf</button>
        <button onClick={() => handleRaceChange('Gnome')}>Gnome</button>
        <button onClick={() => handleRaceChange('Halfling')}>Halfling</button>
        <button onClick={() => handleRaceChange('Dwarf')}>Dwarf</button>
        <button onClick={() => handleRaceChange('Half-Orc')}>Half-Orc</button>
        <p>Selected Race: {characterData.race}</p>
    </div>
    )
}

export default Race;