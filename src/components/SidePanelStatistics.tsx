import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BaldursGateStyle.css";
import Thac0DescriptionPopup from "./popups/Thac0DescriptionPopup";
import AcDescriptionPopup from "./popups/AcDescriptionPopup";
import LoreDescriptionPopup from "./popups/LoreDescriptionPopup";
import IntoxicatedDescriptionPopup from "./popups/IntoxicatedDascriptionPopup";
import BashingDescriptionPopup from "./popups/BahsingDescriptionPopup";
import FatigueDescriptionPopup from "./popups/FatigueDescriptionPopup";


const SidePanelStatistics: React.FC = () => {
  const {characterData, setCharacterData} = useCharacterContext();

  return (
    <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
        <p className="center-text">Statystyki: </p>
        <p style={{ margin: "3px", fontSize: "1.5rem", justifyContent: "center", alignItems: "center"}} className="center-text">Zdrowie: Min:{(1*characterData.level)} Max:{(characterData.HPdice*characterData.level)+(characterData.HPperLvBonus*characterData.level)}</p>
        <div className="d-flex flex-row" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
            <p style={{ margin: "3px", fontSize: "1.5rem"}} className="center-text">Kość Zdrowia: {characterData.HPdice}</p>
            <p style={{ margin: "3px", fontSize: "1.5rem"}} className="center-text">Bonus zdrowia na poziom: {characterData.HPperLvBonus}</p>
        </div>
        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            <li><Thac0DescriptionPopup/> (walka wręcz): {characterData.baseThac0+characterData.melleThac0+characterData.classBonusThac0}</li>
            <li><Thac0DescriptionPopup/> (walka dystansowa): {characterData.baseThac0+characterData.rangedThac0+characterData.classBonusThac0}</li>
            <li>Bonus zadawanych obrażeń: {characterData.dmgBonus}</li>
            <li><AcDescriptionPopup/>: {characterData.baseAC+characterData.AC-characterData.classBonusAC}</li>
        </ul>

        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            <li>Kradzież Kieszonkowa BONUS: {characterData.Kradzież_KieszonkowaBonus}</li>
            <li>Otwieranie Zamków BONUS: {characterData.Otwieranie_ZamkówBonus}</li>
            <li>Znajdywanie Pułapek BONUS: {characterData.Znajdywanie_PułapekBonus}</li>
            <li>Ciche Poruszanie BONUS: {characterData.Ciche_PoruszanieBonus}</li>
            <li>Krycie w Cieniu BONUS: {characterData.Krycie_W_CieniuBonus}</li>
            <li>Rozstawianie Pułapek BONUS: {characterData.Rozstawianie_PułapekBonus}</li>
        </ul>

        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            <li>Maksymalny poziom zaklęć maga: {characterData.INTmaxSpellLevel}</li>
            <li>Maksymalna liczbna zaklęć w księdze czarów: {characterData.INTspellPerLevel}</li>
            <li>Szansza Przepisania zwoju: {characterData.scribeSuccessRate}%</li>
            <li>Dodatkowe zaklęcią kleryka Poziom 1: {characterData.extraSpellSlotlv1}</li>
            <li>Dodatkowe zaklęcią kleryka Poziom 2: {characterData.extraSpellSlotlv2}</li>
            <li>Dodatkowe zaklęcią kleryka Poziom 3: {characterData.extraSpellSlotlv3}</li>
            <li>Dodatkowe zaklęcią kleryka Poziom 4: {characterData.extraSpellSlotlv4}</li>
            <li><LoreDescriptionPopup/>:{" "}{(characterData.WISlore) + (characterData.INTlore)}</li>
        </ul>

        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            <li><BashingDescriptionPopup/>: {characterData.bashing}</li>
            <li>Udźwig: {characterData.weight}</li>
            <li><IntoxicatedDescriptionPopup/>: {characterData.IntoxicationPerDrink}</li>
            <li><FatigueDescriptionPopup/>: {characterData.fatigue}</li>
            <li>Reakcja NPC: {characterData.reaction}</li>
            <li>Zniżka w sklepach: {characterData.buyDiscount}%</li>
        </ul>
    </div>
  );
};

export default SidePanelStatistics;