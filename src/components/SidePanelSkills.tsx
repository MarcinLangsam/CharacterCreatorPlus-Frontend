import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BaldursGateStyle.css";
import { ThievingAbilities, WeaponProficiencys } from "../types/CharacterData";
import { raseBonusThievingAbilities, ThievingAbilityName } from "./ThievingAbilitiesMenu";
import SpellDescriptionPopup from "./popups/BhaalDescriptionPopup";
import WizardDescriptionPopup from "./popups/WizardDescriptionPopup c copy";
import ClericDescriptionPopup from "./popups/ClericDescriptionPopup c";


const SidePanelSkills: React.FC = () => {
  const {characterData, setCharacterData} = useCharacterContext();

  const getSelectedSkills = (skills: WeaponProficiencys) => {
      return Object.entries(skills)
      .filter(([_, value]) => value > 0)
      .map(([skill, value]) => ({skill, value }));
    }
    
    const selectedSkills = getSelectedSkills(characterData.skills);
  
    const getThievingSkillsForRace = (race: string): Partial<ThievingAbilities> => {
      const raceData = raseBonusThievingAbilities[race];
      
      if (!raceData) {
        throw new Error(`Invalid race: ${race}`);
      }
      
      return raceData.skillsThief;
    };
  
    function getThievingAbilityBonus(
      abilityName: string,
    ): number {
      const bonusMapping: Record<ThievingAbilityName, string> = {
        Kradziez_Kieszonkowa: 'Kradzież_KieszonkowaBonus',
        Otwieranie_Zamkow: 'Otwieranie_ZamkówBonus',
        Znajdywanie_Pulapek: 'Znajdywanie_PułapekBonus',
        Ciche_Poruszanie: 'Ciche_PoruszanieBonus',
        Krycie_W_Cieniu: 'Krycie_W_CieniuBonus',
        Rozstawianie_Pulapek: 'Rozstawianie_PułapekBonus',
      };
    
      if (abilityName in bonusMapping) {
        const bonusKey = bonusMapping[abilityName as ThievingAbilityName];
        return characterData.skillsThief[bonusKey as keyof ThievingAbilities] || 0;
      }
    
      return 0;
    }

  return (
    <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
        <p className="center-text">Biegłości:</p>
        <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            {selectedSkills.map(({ skill, value }) => (
            <li key={skill}>
                {skill}: {value}
            </li>
            ))}
            
        </ul>
        <p className="center-text">Zaklęcia:</p>
        {!["Mag", "Czarownik", "Bard", "Kapłan", "Szaman", "Druid"].includes(characterData.classes) && <span style={{ fontStyle: "italic", fontSize: "1.2rem", color: "red" }}>Ta klasa nie ma dostępu do zaklęć</span>}
        <div className="d-flex flex-row" style={{ backgroundColor: "rgb(30, 30, 30)", flexWrap: "wrap"}}>
          {["Mag", "Czarownik", "Bard"].includes(characterData.classes) ? (
              characterData.wizardSpells.map((spell, index) => (
                  <div key={index} style={{ border: "1px solid gray", margin: "1px", padding: "1px", backgroundColor: "rgb(30, 30, 30)" }}>
                      <WizardDescriptionPopup 
                          name={spell.name} 
                          level={spell.level} 
                          schcool={spell.school} 
                          iconData={spell.icon}
                      />
                  </div>
              ))
          ) : (
              null
          )}
        </div>
        <div className="d-flex flex-row" style={{ backgroundColor: "rgb(30, 30, 30)", flexWrap: "wrap" }}>
          {["Kapłan", "Szaman", "Druid"].includes(characterData.classes) ? (
              characterData.clericSpells.map((spell, index) => (
                  <div key={index} style={{ border: "1px solid gray", margin: "1px", padding: "1px", backgroundColor: "rgb(30, 30, 30)" }}>
                      <ClericDescriptionPopup 
                          name={spell.name} 
                          level={spell.level} 
                          schcool={spell.school} 
                          iconData={spell.icon}
                      />
                  </div>
              ))
          ) : (
              null
          )}
        </div>
        <p className="center-text">Umiejętności Złodziejskie:</p>
        {["Łowca", "Bard", "Szaman", "Złodziej"].includes(characterData.classes) ? (
            Object.entries(characterData.skillsThief)
            .filter(([_, value]) => value !== -1)
            .map(([skillsThief, value]) => {
                const race = characterData.race || "Człowiek";
                const raceBonuses = getThievingSkillsForRace(race);
                const raceBonus = raceBonuses[skillsThief as keyof ThievingAbilities] || 0;
                const attributeBonus = getThievingAbilityBonus(skillsThief);
                return (
                <div key={skillsThief} style={{ backgroundColor: "rgb(30, 30, 30)" }}>
                    <span className="plainText">
                      {skillsThief}: {value + raceBonus + attributeBonus} 
                    </span>
                </div>
                );
            })
            ) : (
            <span style={{ fontStyle: "italic", fontSize: "1.2rem", color: "red" }}>Ta klasa nie ma dostępu do umiejętności złodziejskich</span>
            )}
        <p className="center-text">Wróg rasowy: {characterData.racialEnemy}</p>
        {!["Łowca"].includes(characterData.classes) && <span style={{ fontStyle: "italic", fontSize: "1.2rem", color: "red" }}>Ta klasa nie ma dostępu do wroga rasowego</span>}
    </div>
  );
};

export default SidePanelSkills;