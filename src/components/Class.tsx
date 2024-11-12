import React from "react";
import { useCharacterContext } from "../context/CharacterContext";

const classes: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext();

    const handleClassesChange = (classes: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            classes: classes,
        }));
    };
    
    return(
    <div>
        <h2>Choose Class</h2>
        <button onClick={() => handleClassesChange('Fighter')}>Fighter</button>
        <button onClick={() => handleClassesChange('Ranger')}>Ranger</button>
        <button onClick={() => handleClassesChange('Paladin')}>Paladin</button>
        <button onClick={() => handleClassesChange('Cleric')}>Cleric</button>
        <button onClick={() => handleClassesChange('Druid')}>Druid</button>
        <button onClick={() => handleClassesChange('Mage')}>Mage</button>
        <button onClick={() => handleClassesChange('Thief')}>Thief</button>
        <button onClick={() => handleClassesChange('Bard')}>Bard</button>
        <button onClick={() => handleClassesChange('Sorcerer')}>Sorcerer</button>
        <button onClick={() => handleClassesChange('Monk')}>Monk</button>
        <button onClick={() => handleClassesChange('Shaman')}>Shaman</button>
        
        <p>Selected Class: {characterData.classes}</p>
    </div>
    )
}

export default classes;