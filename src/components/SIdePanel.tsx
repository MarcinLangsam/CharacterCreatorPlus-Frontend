import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BaldursGateStyle.css";
import SidePanelCharacteristic from "./SidePanelCharacteristic";
import SidePanelSkills from "./SidePanelSkills";
import SidePanelStatistics from "./SidePanelStatistics";


type Section = 'characteristics' | 'skills' | 'statistiics';


const SidePanel: React.FC = () => {
  const {characterData, setCharacterData} = useCharacterContext();
  const [activeSection, setActiveSection] = useState<Section>('characteristics');

  const renderContent = () => {
    switch (activeSection) {
      case 'characteristics':
        return <SidePanelCharacteristic />;
      case 'skills':
        return <SidePanelSkills />;
      case 'statistiics':
        return <SidePanelStatistics />;
      default:
        return null;
    }
  };


  return (
    <div className="sidepanel-background">
      <p className="center-text">{characterData.name !== "" ? characterData.name : "Wybierz Imię"} Poziom: {characterData.level !== 0 ? characterData.level : "?"}</p>
      <div className="d-flex flex-row" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
        {/*<img
          src={
            `http://localhost:3000/RaceIcons/${characterData.race}.png`
          }
          alt=""
          style={{ width: "80px", height: "140px" }}
        />
        <img
          src={
            characterData.gender === "Mężczyzna"
              ? `http://localhost:3000/MalePortraits/${characterData.portrait}`
              : `http://localhost:3000/FemalePortraits/${characterData.portrait}`
          }
          alt=""
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
        <img
          src={
            `http://localhost:3000/ClassIcons/${characterData.classes}.png`
          }
          alt=""
          style={{ width: "80px", height: "140px" }}
        />*/}
      </div>
      <div className="button-group" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
        <button className="standard-button" onClick={() => setActiveSection("characteristics")}>Cechy</button>
        <button className="standard-button" onClick={() => setActiveSection("skills")}>Umiejętności</button>
        <button className="standard-button" onClick={() => setActiveSection("statistiics")}>Statystyki</button>
      </div>
      <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
        {renderContent()}
      </div>
  </div>
  );
};

export default SidePanel;