import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BaldursGateStyle.css";


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
            <li>Siła: {characterData.attributes.strength !== 0 ? characterData.attributes.strength : ""}</li>
            <li>Zręczność: {characterData.attributes.agility !== 0 ? characterData.attributes.agility : ""}</li>
            <li>Kondycja: {characterData.attributes.constitution !== 0 ? characterData.attributes.constitution : ""}</li>
            <li>Inteligencja: {characterData.attributes.intelligence !== 0 ? characterData.attributes.intelligence : ""}</li>
            <li>Mądrość: {characterData.attributes.wisdom !== 0 ? characterData.attributes.wisdom : ""}</li>
            <li>Charyzma: {characterData.attributes.charisma !== 0 ? characterData.attributes.charisma : ""}</li>
        </ul>
    </div>
  );
};

export default SidePanelCharacteristic;