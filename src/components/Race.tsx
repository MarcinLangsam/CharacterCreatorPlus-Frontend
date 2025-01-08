import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { useExportDataContext } from "../context/ExportDataContext";

const Race: React.FC = () => {

    const {characterData, setCharacterData} = useCharacterContext();
    const {exportData, setExportData} = useExportDataContext();
    const [raceDescription, setRaceDescription] = useState<string>();

    const handelBackendFile = async (race: string) => {
      try {
        const response = await fetch(`http://localhost:3000/OpisyRas/${race}.txt`)
        if(!response.ok) {
          throw new Error("Failed to fetch file")
        }
      const raceDescription = await response.text();
      setRaceDescription(raceDescription);
        

      }
      catch (error) {
        console.error('Error handling file:', error)
        setRaceDescription("");
      }
    }

    const handleRaceChange = (race: string, classes: string, subclasses: string) => {
        handelBackendFile(race);
        setCharacterData((prevData) => ({
            ...prevData,
            race: race,
            classes: classes,
            subclasses: subclasses,
        }));

        let raseHex = ""
        if(race=="Człowiek") {raseHex="01"}
        else if(race=="Elf") {raseHex="02"}
        else if(race=="Pół_Elf") {raseHex="03"}
        else if(race=="Gnom") {raseHex="06"}
        else if(race=="Niziołek") {raseHex="05"}
        else if(race=="Krasnolud") {raseHex="04"}
        else if(race=="Pół_Ork") {raseHex="07"}

        setExportData((prev) => ({
            ...prev,
            race: raseHex,
        }))
    };


    return(
    <>
      <h2 className="secondary-text">Wybierz Rasę</h2>
      <div className="d-flex flex-row">
        <div className="d-flex flex-col creation-background">
            <button className="creation-button" onClick={() => handleRaceChange('Człowiek','','')}>Człowiek</button>
            <button className="creation-button" onClick={() => handleRaceChange('Elf','','')}>Elf</button>
            <button className="creation-button" onClick={() => handleRaceChange('Pół_Elf','','')}>Pół-Elf</button>
            <button className="creation-button" onClick={() => handleRaceChange('Gnom','','')}>Gnom</button>
            <button className="creation-button" onClick={() => handleRaceChange('Niziołek','','')}>Niziołek</button>
            <button className="creation-button" onClick={() => handleRaceChange('Krasnolud','','')}>Krasnolud</button>
            <button className="creation-button" onClick={() => handleRaceChange('Pół_Ork','','')}>Pół-Ork</button>
            {characterData.race !== "noneRace" ? (
              <p className="chosen-creation-data">Wybrano: {characterData.race}</p>
            ): null}
        </div>

        <div className="creation-background">
          <span style={{ whiteSpace: "pre-wrap" }}>{raceDescription}</span>
        </div>
        
      </div>
    </>
    )
}

export default Race;