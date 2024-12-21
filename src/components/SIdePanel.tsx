import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { WeaponProficiencys } from "../types/CharacterData";


const SidePanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {characterData, setCharacterData} = useCharacterContext();

  const getSelectedSkills = (skills: WeaponProficiencys) => {
          return Object.entries(skills)
          .filter(([_, value]) => value > 0)
          .map(([skill, value]) => ({skill, value }));
      }
      const selectedSkills = getSelectedSkills(characterData.skills);

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container">
      <button className={`toggleButton ${isVisible ? "visible" : ""}`} onClick={togglePanel}>
        {isVisible ? "-->" : "<--"}
      </button>
      <div className={`sidePanel ${isVisible ? "visible" : ""}`}>
      <div className="m-3">
            <p className="plainTextBig">{characterData.name}</p>
            <p className="plainText">Płeć: {characterData.gender}</p>
            <p className="plainText">Rasa: {characterData.race}</p>
            <p className="plainText">Klasa: {characterData.classes}</p>
            <p className="plainText">Podklasa: {characterData.subclasses}</p>
            <p className="plainText">Charakter: {characterData.character}</p>

            <p className="plainTextBig">Atrybuty: 
                <ul className="ml-5">
                    <li className="plainText">Siła: {characterData.attributes.strength}</li>
                    <li className="plainText">Zręczność: {characterData.attributes.agility}</li>
                    <li className="plainText">Kondycja: {characterData.attributes.constitution}</li>
                    <li className="plainText">Inteligencja: {characterData.attributes.intelligence}</li>
                    <li className="plainText">Mądrość: {characterData.attributes.wisdom}</li>
                    <li className="plainText">Charyzma: {characterData.attributes.charisma}</li>
                </ul>
            </p>

            <p className="plainTextBig">Biegłości:</p>
            <ul className="ml-5">
                {selectedSkills.map(({ skill, value }) => (
                    <li  className="plainText" key={skill}>
                        {skill}: {value}
                    </li>
                ))}
            </ul>
            
            <p className="plainTextBig">Statystyki:</p>
            <div  className="m-5">
              <p className="plainText">Kość zdrowia: {characterData.HPdice}</p>
              <p className="plainText">Bonus zdrowia na poziom: {characterData.HPperLvBonus}</p>
            </div>
            <div className="flex flex-row m-5">
              <p className="plainText">THAC0 (walka wręcz): {characterData.melleThac0}</p>
              <p className="plainText">THAC0 (walka na dystans): {characterData.rangedThac0}</p>
              <p className="plainText">Bonus obrażeń: {characterData.dmgBonus}</p>
            </div>
            <div  className="m-5">
              <p className="plainText">KP: {characterData.AC}</p>
              <p className="plainText">Bonus do kradzieży kieszonkowej: {characterData.Kradzież_KieszonkowaBonus}</p>
              <p className="plainText">Bonus do otwierania zamków: {characterData.Otwieranie_ZamkówBonus}</p>
              <p className="plainText">Bonus do znajdywania pułapek: {characterData.Znajdywanie_PułapekBonus}</p>
              <p className="plainText">Bonus do cichego poruszania: {characterData.Ciche_PoruszanieBonus}</p>
              <p className="plainText">Bonus do krycia w cienu: {characterData.Krycie_W_CieniuBonus}</p>
              <p className="plainText">Bonus do rozstawiania pułapek: {characterData.Rozstawianie_Pułapek}</p>
            </div>
            <div  className="m-5">
              <p className="plainText">Max poziom zaklęć maga: {characterData.INTmaxSpellLevel}</p>
              <p className="plainText">Max zaklęć maga na poziom: {characterData.INTspellPerLevel}</p>
              <p className="plainText">Bonusowe zaklęcia klerka poziomu 1: {characterData.extraSpellSlotlv1}</p>
              <p className="plainText">Bonusowe zaklęcia klerka poziomu 2: {characterData.extraSpellSlotlv2}</p>
              <p className="plainText">Bonusowe zaklęcia klerka poziomu 3: {characterData.extraSpellSlotlv3}</p>
              <p className="plainText">Bonusowe zaklęcia klerka poziomu 4: {characterData.extraSpellSlotlv4}</p>
              <p className="plainText">Wiedza (MĄDROŚĆ + INTELIGENCJA): {(characterData.WISlore || 0) + (characterData.INTlore || 0)}</p>
            </div>
            <div className="m-5">
              <p className="plainText">Szansa przepisania zwoju: {characterData.scribeSuccessRate}</p>
              <p className="plainText">Wyważanie zamków: {characterData.bashing}</p>
              <p className="plainText">Udźwig: {characterData.weight}</p>
              <p className="plainText">Intoksykacja na trunek: {characterData.IntoxicationPerDrink}</p>
              <p className="plainText">Zmęczenie: {characterData.fatigue}</p>
              <p className="plainText">Rekcja NPC: {characterData.reaction}</p>
              <p className="plainText">Zniżka w sklepach: {characterData.buyDiscount}%</p>
              <p className="plainText">Przeciwnik Rasowy: {characterData.racialEnemy}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;