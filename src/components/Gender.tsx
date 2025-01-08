import React from "react"
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from "../context/ExportDataContext";
import oranteBorder from "../images/ornate-border.png"

const Gender: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext();
    const {exportData, setExportData} = useExportDataContext();
    

    const handleGenderChange = (gender: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            gender: gender,
        }));

        let genderHex = ""
        if(gender == "Mężczyzna"){genderHex = "01"}
        if(gender == "Kobieta"){genderHex = "02"}

        setExportData((prevData) => ({
            ...prevData,
            gender: genderHex,
        }));

    };
     
    return(
    <>
        <h2 className="secondary-text">Wybierz Płeć</h2>
        <div className="d-flex flex-row">
            <div className="creation-background">
                <button className="creation-button" onClick={() => handleGenderChange('Mężczyzna')}>Mężczyzna</button>
                <button className="creation-button" onClick={() => handleGenderChange('Kobieta')}>Kobieta</button>
                {characterData.gender && (
                    <p className="chosen-creation-data">Wybrano: {characterData.gender}</p>
                )}
            </div>
            <div className="creation-background">
                <span>
                    To wybór natury estetycznej i nie wpłynie w żaden sposób na cechy bohatera. 
                    Ma jednak wływ na to czy jakiś bohater niezależny zainteresuje się twoją postacią pod względem uczuciowym.
                </span>
                {characterData.gender === "Kobieta" ? (
                    <span>Kobiety żyjące w kraninach mogą awansować w dowolnej klasie, z łatwością dorwójują swoim męskim odpowiednikom pod względem wszystkich umiejętności.</span>
                ) : characterData.gender === "Mężczyzna" ? (
                    <span>Mężczyźni żyjący w kraninach mogą awansować w dowolnej klasie jaką wybiorą mogą być magami, złodziejami czy znawcami sztuki wojennej.</span>
                ) : null}
            </div>
        </div>
    </>
    )
}

export default Gender;