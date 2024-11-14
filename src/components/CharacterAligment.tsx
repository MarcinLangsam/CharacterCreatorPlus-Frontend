import React from "react";
import { useCharacterContext } from "../context/CharacterContext";

const CharacterAligment: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext()

    const handleCharacterAligmentChange = (character: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            character: character,
        }));
    };
    
    return(
    <div>
        <h2>Wybierz Charakter</h2>
        <div className="flex flex-row">
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Prawożądny Dobry')}>Prawożądny Dobry</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Nautralny Dobry')}>Nautralny Dobry</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Chaotyczny Dobry')}>Chaotyczny Dobry</button>
        </div>

        <div className="flex flex-row">
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Prawożądny Nautralny')}>Prawożądny Nautralny</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Nautralny')}>Nautralny</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Chaotyczny Nautralny')}>Chaotyczny Nautralny</button>
        </div>

        <div className="flex flex-row">
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Prawożądny Zły')}>Prawożądny Zły</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Nautralny Zły')}>Nautralny Zły</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleCharacterAligmentChange('Chaotyczny Zły')}>Chaotyczny Zły</button>
        </div>
    </div>
    )
}

export default CharacterAligment