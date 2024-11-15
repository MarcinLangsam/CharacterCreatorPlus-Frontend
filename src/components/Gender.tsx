import React from "react"
import { useCharacterContext } from '../context/CharacterContext';

const Gender: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext();

    const handleGenderChange = (gender: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            gender: gender,
        }));
    };
     
    return(
    <div>
        <h2>Wybierz Płeć</h2>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleGenderChange('Mężczyzna')}>Mężczyzna</button>
        <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleGenderChange('Kobieta')}>Kobieta</button>
    </div>
    )
}

export default Gender;