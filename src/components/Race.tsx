import React from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { useExportDataContext } from "../context/ExportDataContext";

const Race: React.FC = () => {

    const {characterData, setCharacterData} = useCharacterContext();
    const {exportData, setExportData} = useExportDataContext();

    const handleRaceChange = (race: string, classes: string, subclasses: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            race: race,
            classes: classes,
            subclasses: subclasses,
        }));

        let raseHex = ""
        if(race="Człowiek") {raseHex="01"}
        if(race="Elf") {raseHex="02"}
        if(race="Pół_Elf") {raseHex="03"}
        if(race="Gnom") {raseHex="06"}
        if(race="Niziołek") {raseHex="05"}
        if(race="Krasnolud") {raseHex="04"}
        if(race="Pół_Ork") {raseHex="07"}

        setExportData((prev) => ({
            ...prev,
            race: raseHex,
        }))
    };


    return(
    <div className="flex flex-col">
        <h2>Wybierz Rasę</h2>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Człowiek','','')}>Człowiek</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Elf','','')}>Elf</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Pół_Elf','','')}>Pół-Elf</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Gnom','','')}>Gnom</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Niziołek','','')}>Niziołek</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Krasnolud','','')}>Krasnolud</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleRaceChange('Pół_Ork','','')}>Pół-Ork</button>
    </div>
    )
}

export default Race;