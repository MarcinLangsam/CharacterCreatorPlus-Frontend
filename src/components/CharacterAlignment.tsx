import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { useExportDataContext } from "../context/ExportDataContext";

const alignmentOptions: { [key: string]: string[]} = {
    //Warriors subclasses
    Wojownik: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Berserker: ['Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Zabójca_Magów: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Kensai: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły'],
    Krasnoludzki_Obrońca: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Barbarzyńca: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Hunter subclasses
    Łowca: ['Praworządny Dobry', 'Neytralny Dobry', 'Chotyczny Dobry'],
    Łucznik: ['Praworządny Dobry', 'Neytralny Dobry', 'Chotyczny Dobry'],
    Prześladowca: ['Praworządny Dobry', 'Neytralny Dobry', 'Chotyczny Dobry'],
    Władca_Zwierząt: ['Praworządny Dobry', 'Neytralny Dobry', 'Chotyczny Dobry'],
    //Paladin subclasses
    Paladyn: ['Praworządny Dobry'],
    Kawalerzysta: ['Praworządny Dobry'],
    Inkwizytor: ['Praworządny Dobry'],
    Łowca_Nieumarłych: ['Praworządny Dobry'],
    Czarny_Strażnik: ['Praworządny Zły', 'Neutralny Zły', 'Chotyczny Zły'],
    //Cleric subclasses
    Kapłan: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Kapłan_Talosa: ['Chotyczny Neutralny', 'Praworządny Zły', 'Neutralny Zły', 'Chaotyczny Zły'],
    Kapłan_Helma: ['Praworządny Dobry', 'Praworządny Neutralny', 'Neutralny', 'Chotyczny Nautralny', 'Praworządny Zły'],
    Kapłan_Lathandera: ['Praworządny Dobry', 'Neutralny Dobry', 'Chotyczny Dobry', 'Neutralny'],
    Kapłan_Tyra: ['Praworządny Dobry', 'Neutralny Dobry', 'Praworządny Neutralny'],
    Kapłan_Tempusa: ['Chaotyczny Dobry', 'Neutralny', 'Chotyczny Neutralny', 'Chotyczny Zły'],
    //Druid subclasses
    Druid: ['Neutralny'],
    Totemiczny_Druid: ['Neutralny'],
    Zmiennokształtny: ['Neutralny'],
    Mściciel: ['Neutralny'],
    //Mage subclasses
    Mag: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Mag_Specjalista: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Dziki_Mag: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Thief subclasses
    Łotrzyk: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Asasyn: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Łowca_Głów: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Zawadiaka: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Tancerz_Cienia: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Bard subclasses
    Bard: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Bard_Ostrzy: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Błazen: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Skald: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    //Sorcerer subclasses
    Czarodziej: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Uczeń_Smoka: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Monk subclasses
    Monk: ['Praworządny Dobry','Prawożądny Nautralny','Prawożądny Zły'],
    Monk_Mrocznego_Księżyca: ['Praworządny Zły'],
    Monk_Słonecznej_Duszy: ['Praworządny Dobry'],
    //Szaman subclasses :P
    Szaman: ['Neutralny Dobry', 'Neutralny', 'Neutralny Zły'],
}


const CharacterAlignment: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext()
    const {exportData, setExportData} = useExportDataContext()
    const [backendAlignment, setAlignment] = useState<String>();


    useEffect(() => {
        const fetchAndInitializeData = async () => {
            try {
                const alignmentResponse = await fetch("http://localhost:3000/alignment");
                if (!alignmentResponse.ok) {
                    throw new Error(`HTTP error! status: ${alignmentResponse.status}`);
                }
                const data = await alignmentResponse.json();
                const selectedAlignment = data.find(
                    (data: { alignment: string | undefined }) => data.alignment === characterData.character
                );
                console.log(selectedAlignment.number)

                 setExportData((prev) => ({
                     ...prev,
                     character: selectedAlignment.number,
                   }));

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAndInitializeData();

    }, [characterData.character]);


    const handleCharacterAligmentChange = (character: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            character: character,
        }));

        let characterHex = ""
        if(character = "Praworządny Dobry") {characterHex = "11"}
        if(character = "Praworządny Neutralny") {characterHex = "12"}
        if(character = "Praworządny Zły") {characterHex = "13"}
        if(character = "Neutralny Dobry") {characterHex = "21"}
        if(character = "Neturalny") {characterHex = "22"}
        if(character = "Neutralny Zły") {characterHex = "23"}
        if(character = "Chaotyczny Dobry") {characterHex = "31"}
        if(character = "Chaotyczny Neutralny") {characterHex = "32"}
        if(character = "Chotyczny Zły") {characterHex = "33"}

        setExportData((prev) => ({
            ...prev,
            character: characterHex,
        }))
    };

    const availableAlignments = () => {
        const selectedSubclass = characterData.subclasses

        if (!selectedSubclass) return [];

        const alignments = alignmentOptions[selectedSubclass] || [];

        return alignments
     }
    
    return(
    <>
        <h2 className="secondaryText">Wybierz Charakter</h2>
        <div className="flex flex-col secondaryBackground">
            {availableAlignments().map((alignment) => (
                <button key={alignment} className="tertiaryText" onClick={() => handleCharacterAligmentChange(alignment)}>
                {alignment}
            </button>
            ))}
        </div>
    </>
    )
}

export default CharacterAlignment