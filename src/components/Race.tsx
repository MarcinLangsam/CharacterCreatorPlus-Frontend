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
    <div className="flex flex-col">
        <h2>Wybierz Rasę</h2>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Człowiek')}>Człowiek</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Elf')}>Elf</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Pół-Elf')}>Pół-Elf</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Gnome')}>Gnome</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Niziołek')}>Niziołek</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Krasnolud')}>Krasnolud</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Pół-Ork')}>Pół-Ork</button>
    </div>
    )
}

export default Race;