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
        <h2>Choose Character</h2>
        <button onClick={() => handleCharacterAligmentChange('Lawful Good')}>Lawful Good</button>
        <button onClick={() => handleCharacterAligmentChange('Neutral Good')}>Neutral Good</button>
        <button onClick={() => handleCharacterAligmentChange('Chaotic Good')}>Chaotic Good</button>

        <button onClick={() => handleCharacterAligmentChange('Lawful Neutral')}>Lawful Neutral</button>
        <button onClick={() => handleCharacterAligmentChange('Neutral Neutral')}>Neutral Neutral</button>
        <button onClick={() => handleCharacterAligmentChange('Chaotic Neutral')}>Chaotic Neutral</button>

        <button onClick={() => handleCharacterAligmentChange('Lawful Evil')}>Lawful Evil</button>
        <button onClick={() => handleCharacterAligmentChange('Neutral Evil')}>Neutral Evil</button>
        <button onClick={() => handleCharacterAligmentChange('Chaotic Evil')}>Chaotic Evil</button>
        <p>Selected Character: {characterData.character}</p>
    </div>
    )
}

export default CharacterAligment