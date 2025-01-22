import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { useExportDataContext } from "../context/ExportDataContext";
import SpellDescriptionPopup from "./popups/BhaalDescriptionPopup";

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
    Tropiciel: ['Praworządny Dobry', 'Neytralny Dobry', 'Chotyczny Dobry'],
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
    Mistrz_Odrzucania: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Mistrz_Przywołań: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Mistrz_Pozanania: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Mistrz_Zauroczeń: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Ilizjonista: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Mistrz_Inwokacji: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Nekromanta: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Mistrz_Przemian: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Dziki_Mag: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Thief subclasses
    Złodziej: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Zabójca: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Łowca_Nagród: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Zawadiaka: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Tancerz_Cieni: ['Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Bard subclasses
    Bard: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Fechmistrz: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Błazen: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Skald: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    //Sorcerer subclasses
    Czarownik: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Uczeń_Smoka: ['Praworządny Dobry','Praworządny Neutralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Monk subclasses
    Mnich: ['Praworządny Dobry','Prawożądny Nautralny','Prawożądny Zły'],
    Mnich_Ciemnego_Księżyca: ['Praworządny Zły'],
    Mnich_Słonecznej_Duszy: ['Praworządny Dobry'],
    //Szaman subclasses :P
    Szaman: ['Neutralny Dobry', 'Neutralny', 'Neutralny Zły'],
}

const BhaalspawnAbilitiesByAligment: { [key: string]: string[]} = {
    "Praworządny Dobry": ['Leczenie Lekkich Ran','Leczenie Lekkich Ran','Spowlonienie Trucizny','Spowlonienie Trucizny', 'Przywołanie Boskiej Mocy', 'Przywołanie Boskiej Mocy'],
    "Praworządny Neutralny": ['Leczenie Lekkich Ran', 'Spowlonienie Trucizny', 'Przywołanie Boskiej Mocy', 'Pomniejsze drążnie Larlocha', 'Wampiryczne dotknięcie', 'Groza'],
    "Praworządny Zły": ['Pomniejsze drążnie Larlocha', 'Pomniejsze drążnie Larlocha', 'Wampiryczne dotknięcie', 'Wampiryczne dotknięcie', 'Groza', 'Groza'],
    "Neutralny Dobry": ['Leczenie Lekkich Ran','Leczenie Lekkich Ran','Przywołanie Boskiej Mocy', 'Przywołanie Boskiej Mocy', 'Groza', 'Groza'],
    "Neutralny": ['Leczenie Lekkich Ran','Leczenie Lekkich Ran','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    "Neutralny Zły": ['Pomniejsze drążnie Larlocha', 'Pomniejsze drążnie Larlocha', 'Wampiryczne dotknięcie', 'Wampiryczne dotknięcie', 'Groza', 'Groza'],
    "Chaotyczny Dobry": ['Leczenie Lekkich Ran','Leczenie Lekkich Ran','Spowlonienie Trucizny','Spowlonienie Trucizny', 'Przywołanie Boskiej Mocy', 'Przywołanie Boskiej Mocy'],
    "Chaotyczny Neutralny": ['Spowlonienie Trucizny','Spowlonienie Trucizny', 'Pomniejsze drążnie Larlocha', 'Pomniejsze drążnie Larlocha', 'Wampiryczne dotknięcie', 'Wampiryczne dotknięcie'],
    "Chotyczny Zły": ['Pomniejsze drążnie Larlocha', 'Pomniejsze drążnie Larlocha', 'Wampiryczne dotknięcie', 'Wampiryczne dotknięcie', 'Groza', 'Groza'],
}

interface BhaalspawnAbilitiesBackend {
    id: number;
    name: string;
    school: string;
    level: number;
    descriptionFile: string;
    iconFile: string;
}

const CharacterAlignment: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext()
    const {exportData, setExportData} = useExportDataContext()
    const [backendAlignment, setAlignment] = useState<String>();
    const [bhallspawnAbilities, setBhallspawnAbilities] = useState<BhaalspawnAbilitiesBackend[]>();

    useEffect(() => {
        const fetchAndInitializeData = async () => {
            try {
                const alignmentResponse = await fetch("http://localhost:3000/alignment");
                if (!alignmentResponse.ok) {
                    throw new Error(`HTTP error! status: ${alignmentResponse.status}`);
                }
                const alignment = await alignmentResponse.json();
                const selectedAlignment = alignment.find(
                    (data: { alignment: string | undefined }) => data.alignment === characterData.aligment
                );

                if (selectedAlignment) {
                    setExportData((prev) => ({
                        ...prev,
                        character: selectedAlignment.number,
                    }));
                } else {
                    console.warn("Selected alignment not found!");
                }


                const bhaalspawnResponse = await fetch("http://localhost:3000/bhaallspawnAbiliteisData");
                if (!bhaalspawnResponse.ok) {
                    throw new Error(`HTTP error! status: ${bhaalspawnResponse.status}`);
                }
                const bhallspawn = await bhaalspawnResponse.json();
                
                setBhallspawnAbilities(bhallspawn);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAndInitializeData();

    }, [characterData.aligment]);


    const handleCharacterAligmentChange = (character: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            aligment: character,
        }));

        let characterHex = ""
        if(character == "Praworządny Dobry") {characterHex = "11"}
        if(character == "Praworządny Neutralny") {characterHex = "12"}
        if(character == "Praworządny Zły") {characterHex = "13"}
        if(character == "Neutralny Dobry") {characterHex = "21"}
        if(character == "Neturalny") {characterHex = "22"}
        if(character == "Neutralny Zły") {characterHex = "23"}
        if(character == "Chaotyczny Dobry") {characterHex = "31"}
        if(character == "Chaotyczny Neutralny") {characterHex = "32"}
        if(character == "Chotyczny Zły") {characterHex = "33"}

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
        <h2 className="secondary-text">Wybierz Charakter</h2>
        <div className="d-flex flex-row">
            <div className="d-flex flex-col creation-background">
                {availableAlignments().map((alignment) => (
                    <button key={alignment} className="creation-button" onClick={() => handleCharacterAligmentChange(alignment)}>
                    {alignment}
                </button>
                ))}
                {characterData.aligment != "" && (
                <p className="chosen-creation-data">Wybrano: {characterData.aligment}</p>
              )}
            </div>
            <div className="d-flex flex-col creation-background">
                <span>
                    Wybór określonego charakteru nie ogranicza podejmowanych wyborów bądź nie blokuje dostępu do zadań,
                    wybierając przykładowo dobry charakter można podjemować decyzje klasyfikowane jako złe.
                    Charakter ma wpływ na zaklęcia Bhaala zdobywane podczas pierwszej części gry.
                    Dodatkowo wpływa na startową reputację gracza, niektóre przedmioty mogą być używane tylko przez postać z określonym charakterem.
                    Pełną listę przedmiotów oraz reputacje przypisane do charakteru można znaleść na tej stronie:<br/>
                    <a href="https://baldursgate.fandom.com/wiki/Alignment#Alignment_for_Gorion's_Ward">Alignment for Gorion's Ward - Baldur's Gate II Wiki</a><br/>
                    Ostatecznie charakter ma wpływa na dwa pierwsze wyzwania z Wymiaru Kieszonkowego w dodatku Tron Bhaala, o którym więcej można dowiedzieć się tutaj:<br/>
                    <a href="https://baldursgate.fandom.com/wiki/Pocket_Plane_(area)">Pocket Plane (area) - Baldur's Gate II Wiki</a><br/>
                </span>
                <span>
                    Zaklęcia Bhaala:
                    <div className="d-flex flex-row">
                    {bhallspawnAbilities && bhallspawnAbilities.length > 0 ? (
                        bhallspawnAbilities
                            .filter((ability) =>
                                BhaalspawnAbilitiesByAligment[characterData.aligment]?.includes(ability.name)
                            )
                            .map((ability, index) => (
                                <div key={`${ability.id}-${index}`} style={{ backgroundColor: "rgb(30, 30, 30)" }}>
                                    <SpellDescriptionPopup 
                                        name={ability.name} 
                                        level={ability.level} 
                                        schcool={ability.school} 
                                        iconData={ability.iconFile}
                                    />
                                </div>
                            ))
                    ) : (
                        <span>Wybierz charakter aby zobaczyć dostępne zaklęcia</span>
                    )}
                    </div>
                </span>

            </div>
        </div>
    </>
    )
}

export default CharacterAlignment