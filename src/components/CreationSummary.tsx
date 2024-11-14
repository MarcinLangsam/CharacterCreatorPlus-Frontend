import React from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { WeaponProficiencys } from "../types/CharacterData";

const CreationSummary: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext();

    const getSelectedSkills = (skills: WeaponProficiencys) => {
        return Object.entries(skills)
        .filter(([_, value]) => value > 0)
        .map(([skill, value]) => ({skill, value }));
    }
    const selectedSkills = getSelectedSkills(characterData.skills);

    return(
        <div className="m-3">
            <p>Płeć: {characterData.gender}</p>
            <p>Rasa: {characterData.race}</p>
            <p>Klasa: {characterData.classes}</p>
            <p>Podklasa: {characterData.subclasses}</p>
            <p>Charakter: {characterData.character}</p>
            <p>----------------------------------------------------</p>
            <p>Atrybuty: 
                <ul className="ml-5">
                    <li>Siła: {characterData.attributes.strength}</li>
                    <li>Zręczność: {characterData.attributes.agility}</li>
                    <li>Kondycja: {characterData.attributes.constitution}</li>
                    <li>Inteligencja: {characterData.attributes.intelligence}</li>
                    <li>Mądrość: {characterData.attributes.wisdom}</li>
                    <li>Charyzma: {characterData.attributes.charisma}</li>
                </ul>
            </p>
            <p>----------------------------------------------------</p>
            <p>Biegłości:</p>
            <ul>
                {selectedSkills.map(({ skill, value }) => (
                    <li key={skill}>
                        {skill}: {value}
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default CreationSummary;