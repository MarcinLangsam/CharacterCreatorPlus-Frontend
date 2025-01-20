import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BaldursGateStyle.css";
import StrengthDescriptionPopup from "./popups/StrengthDescriptionPopup";
import AgilityDescriptionPopup from "./popups/AgilityDescriptionPopup";
import ConstitutionDescriptionPopup from "./popups/ConstitutionDescriptionPopup";
import InteligenceDescriptionPopup from "./popups/InteligenceDescriptionPopup";
import WisdomDescriptionPopup from "./popups/WisdomDescriptionPopup";
import CharismaDescriptionPopup from "./popups/CharismaDescriptionPopup";


const SidePanelCharacteristic: React.FC = () => {
  const {characterData, setCharacterData} = useCharacterContext();

  return (
    <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
        <p className="center-text">Cechy:</p>
        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            <li>Płeć: {characterData.gender}</li>
            <li>Rasa: {characterData.race !== "noneRace" ? characterData.race : ""}</li>
            <li>Klasa: {characterData.classes !== "noneClass" ? characterData.classes : ""}</li>
            <li>Podklasa: {characterData.subclasses}</li>
            <li>Charakter: {characterData.character}</li>
        </ul>

        <p className="center-text">Atrybuty:</p>
        
        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            <li><StrengthDescriptionPopup/>: {characterData.attributes.strength !== 0 ? characterData.attributes.strength : ""}</li>
            <li><AgilityDescriptionPopup/>: {characterData.attributes.agility !== 0 ? characterData.attributes.agility : ""}</li>
            <li><ConstitutionDescriptionPopup/>: {characterData.attributes.constitution !== 0 ? characterData.attributes.constitution : ""}</li>
            <li><InteligenceDescriptionPopup/>: {characterData.attributes.intelligence !== 0 ? characterData.attributes.intelligence : ""}</li>
            <li><WisdomDescriptionPopup/>: {characterData.attributes.wisdom !== 0 ? characterData.attributes.wisdom : ""}</li>
            <li><CharismaDescriptionPopup/>: {characterData.attributes.charisma !== 0 ? characterData.attributes.charisma : ""}</li>
        </ul>
    </div>
  );
};

export default SidePanelCharacteristic;