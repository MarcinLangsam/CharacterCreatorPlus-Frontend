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
            <p>----------------------------------------------------</p>
            <p>Statystyki:</p>
            <div className="flex flex-row">
                {/* bonuses for strength */}
                <div className="m-5">
                    <ul>
                        <li>THAC0 (walka wręcz): {characterData.melleThac0}</li>
                        <li>Bonus obrażeń: {characterData.dmgBonus}</li>
                        <li>Wyważanie zamków: {characterData.bashing}</li>
                        <li>Udźwig: {characterData.weight}</li>
                    </ul>
                </div>
                {/* bonuses for agility */}
                <div className="m-5">
                    <ul>
                        <li>THAC0 (walka na dystans): {characterData.rangedThac0}</li>
                        <li>KP: {characterData.AC}</li>
                        <li>Bonus do kradzieży kieszonkowej: {characterData.Kradzież_KieszonkowaBonus}</li>
                        <li>Bonus do otwierania zamków: {characterData.Otwieranie_ZamkówBonus}</li>
                        <li>Bonus do znajdywania pułapek: {characterData.Znajdywanie_PułapekBonus}</li>
                        <li>Bonus do cichego poruszania: {characterData.Ciche_PoruszanieBonus}</li>
                        <li>Bonus do krycia w cienu: {characterData.Krycie_W_CieniuBonus}</li>
                        <li>Bonus do rozstawiania pułapek: {characterData.Rozstawianie_PułapekBonus}</li>
                    </ul>
                </div>
                {/* bonuses for constitution */}
                <div className="m-5">
                    <ul>
                        <li>Bonusowe punkty zdrowia na poziom: {characterData.HPperLvBonus}</li>
                        <li>Intoksykacja na trunek: {characterData.IntoxicationPerDrink}</li>
                        <li>Zmęczenie: {characterData.fatigue}</li>
                    </ul>
                </div>
                {/* bonuses for inteligence */}
                <div className="m-5">
                    <ul>
                        <li>Max poziom zaklęć maga: {characterData.INTmaxSpellLevel}</li>
                        <li>Max zaklęć maga na poziom: {characterData.INTspellPerLevel}</li>
                        <li>Szansa przepisania zwoju: {characterData.scribeSuccessRate}</li>
                        <li>Wiedza (INTELIGENCJA): {characterData.INTlore}</li>
                    </ul>
                </div>
                {/* bonuses for wisdom */}
                <div className="m-5">
                    <ul>
                        <li>Bonusowe zaklęcia klerka poziomu 1: {characterData.extraSpellSlotlv1}</li>
                        <li>Bonusowe zaklęcia klerka poziomu 2: {characterData.extraSpellSlotlv2}</li>
                        <li>Bonusowe zaklęcia klerka poziomu 3: {characterData.extraSpellSlotlv3}</li>
                        <li>Bonusowe zaklęcia klerka poziomu 4: {characterData.extraSpellSlotlv4}</li>
                        <li>Wiedza (MĄDROŚĆ): {characterData.WISlore}</li>
                    </ul>
                </div>
                {/* bonuses for charisma */}
                <div className="m-5">
                    <ul>
                        <li>Rekcja NPC: {characterData.reaction}</li>
                        <li>Zniżka w sklepach: {characterData.buyDiscount}%</li>
                    </ul>
                </div>
                
            </div>

        </div>

    )
}

export default CreationSummary;