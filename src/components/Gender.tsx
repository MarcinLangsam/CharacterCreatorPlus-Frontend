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
        <h2>Choose Gender</h2>
        <button onClick={() => handleGenderChange('Male')}>Male</button>
        <button onClick={() => handleGenderChange('Female')}>Female</button>
        <p>Selected Gender: {characterData.gender}</p>
    </div>
    )
}

export default Gender;