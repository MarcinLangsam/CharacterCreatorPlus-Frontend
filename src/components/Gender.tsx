import React from "react"
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from "../context/ExportDataContext";

const Gender: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext();
    const {exportData, setExportData} = useExportDataContext();
    

    const handleGenderChange = (gender: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            gender: gender,
        }));

        let genderHex = ""
        if(gender = "Mężczyzna"){genderHex = "01"}
        if(gender = "Kobieta"){genderHex = "02"}

        setExportData((prevData) => ({
            ...prevData,
            gender: genderHex,
        }));

    };
     
    return(
    <>
        <h2 className="secondaryText">Wybierz Płeć</h2>
        <div className="secondaryBackground">
            <button className="tertiaryText" onClick={() => handleGenderChange('Mężczyzna')}>Mężczyzna</button>
            <button className="tertiaryText" onClick={() => handleGenderChange('Kobieta')}>Kobieta</button>
        </div>
    </>
    )
}

export default Gender;