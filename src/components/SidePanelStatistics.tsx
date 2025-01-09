import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BaldursGateStyle.css";


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
            <li>Thac0(walka wręcz): {characterData.baseThac0+characterData.melleThac0+characterData.classBonusThac0} ({characterData.baseThac0}-{characterData.melleThac0}-{characterData.classBonusThac0})</li>
            <li>Thac0(walka dystansowa): {characterData.baseThac0+characterData.rangedThac0+characterData.classBonusThac0} ({characterData.baseThac0}+{characterData.rangedThac0}+{characterData.classBonusThac0})</li>
            <li>Damage Bonus: {characterData.dmgBonus}</li>
            <li>Armor Class: {characterData.baseAC+characterData.AC-characterData.classBonusAC} ({characterData.baseAC}-{characterData.AC}-{characterData.classBonusAC})</li>
        </ul>

        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            <li>Kradzież Kieszonkowa Bonus: {characterData.Kradzież_KieszonkowaBonus}</li>
            <li>Otwieranie Zamków Bonus: {characterData.Otwieranie_ZamkówBonus}</li>
            <li>Znajdywanie Pułapek Bonus: {characterData.Znajdywanie_PułapekBonus}</li>
            <li>Ciche Poruszanie Bonus: {characterData.Ciche_PoruszanieBonus}</li>
            <li>Krycie w Cieniu Bonus: {characterData.Krycie_W_CieniuBonus}</li>
            <li>Rozstawianie Pułapek Bonus: {characterData.Rozstawianie_PułapekBonus}</li>
        </ul>

        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            <li>Maksymalny poziom zaklęć maga: {characterData.INTmaxSpellLevel}</li>
            <li>Maksymalna liczna zaklęć w księdze czarów: {characterData.INTspellPerLevel}</li>
            <li>Szansza Przepisania zwoju: {characterData.scribeSuccessRate}%</li>
            <li>Dodatkowe zaklęcią kleryka Poziom 1: {characterData.extraSpellSlotlv1}</li>
            <li>Dodatkowe zaklęcią kleryka Poziom 2: {characterData.extraSpellSlotlv2}</li>
            <li>Dodatkowe zaklęcią kleryka Poziom 3: {characterData.extraSpellSlotlv3}</li>
            <li>Dodatkowe zaklęcią kleryka Poziom 4: {characterData.extraSpellSlotlv4}</li>
            <li>Wiedza:{" "}{(characterData.WISlore) + (characterData.INTlore)}</li>
            <li>Wyważanie zamków: {characterData.bashing}</li>
            <li>Udźwig: {characterData.weight}</li>
            <li>Próg upojenia alkocholowego: {characterData.IntoxicationPerDrink}</li>
            <li>Zmęczenie: {characterData.fatigue}</li>
            <li>Reakcja NPC: {characterData.reaction}</li>
            <li>Zniżka w sklepach: {characterData.buyDiscount}%</li>
        </ul>
    </div>
  );
};

export default SidePanelStatistics;