import React from "react";
import { useCharacterContext } from "../context/CharacterContext";
import SubclassSelector from "./SubclassSelector";

const classes: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext();

    const handleClassesChange = (classes: string, subclasses: string) => {
        setCharacterData((prevData) => ({
            ...prevData,
            classes: classes,
            subclasses: subclasses
        }));
    };
    
    return(
    <div className="flex flex-row">
        <div className="flex flex-col">
            <h2>Wybierz Klasę</h2>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Wojownik','')}>Wojownik</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Łowca','')}>Łowca</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Paladyn','')}>Paladyn</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Kleryk','')}>Kleryk</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Druid','')}>Druid</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Mag','')}>Mag</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Łotrzyk','')}>Łotrzyk</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Bard','')}>Bard</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Czarodziej','')}>Czarodziej</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Monk','')}>Monk</button>
            <button className="border border-black m-2 bg-gray-800 p-2 text-white" onClick={() => handleClassesChange('Shaman','')}>Shaman</button>
        </div>
        <SubclassSelector />
    </div>
    )
}

export default classes;