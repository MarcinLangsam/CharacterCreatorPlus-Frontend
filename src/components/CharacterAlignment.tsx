import React from "react";
import { useCharacterContext } from "../context/CharacterContext";

const alignmentOptions: { [key: string]: string[]} = {
    //Warriors subclasses
    Wojownik: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Berserker: ['Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Zabójca_Magów: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Kensai: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły'],
    Krasnoludzki_Obrońca: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Barbarzyńca: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
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
    Kapłan: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
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
    Mag: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Mag_Specjalista: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Dziki_Mag: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Thief subclasses
    Łotrzyk: ['Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Asasyn: ['Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Łowca_Głów: ['Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Zawadiaka: ['Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Tancerz_Cienia: ['Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Bard subclasses
    Bard: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Bard_Ostrzy: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Błazen: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    Skald: ['Neutralny Dobry','Praworządny Neutralny', 'Neutralny', 'Chaotyczny Neutralny', 'Neutralny Zły'],
    //Sorcerer subclasses
    Czarodziej: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    Uczeń_Smoka: ['Praworządny Dobry','Praworządny Nautralny','Praworządny Zły','Neutralny Dobry', 'Neutralny', 'Neutralny Zły', 'Chaotyczny Dobry', 'Chaotyczny Neutralny', 'Chotyczny Zły'],
    //Monk subclasses
    Monk: ['Praworządny Dobry','Prawożądny Nautralny','Prawożądny Zły'],
    Monk_Mrocznego_Księżyca: ['Praworządny Zły'],
    Monk_Słonecznej_Duszy: ['Praworządny Dobry'],
    //Szaman subclasses :P
    Szaman: ['Neutralny Dobry', 'Neutralny', 'Neutralny Zły'],
}


const CharacterAlignment: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext()

    const handleCharacterAligmentChange = (character: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            character: character,
        }));
    };

    const availableAlignments = () => {
        const selectedSubclass = characterData.subclasses

        if (!selectedSubclass) return [];

        const alignments = alignmentOptions[selectedSubclass] || [];

        return alignments
     }
    
    return(
    <div>
        <h2>Wybierz Charakter</h2>
        <div className="flex flex-col">
            {availableAlignments().map((alignment) => (
                <button key={alignment} className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange(alignment)}>
                {alignment}
            </button>
            ))}
        </div>
    </div>
    )
}

export default CharacterAlignment