import React, { useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { ThievingAbilities, WeaponProficiencys } from "../types/CharacterData";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BaldursGateStyle.css";
import { raseBonusThievingAbilities, ThievingAbilityName } from "./ThievingAbilitiesMenu";


const SidePanel: React.FC = () => {
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

  const [activeTab, setActiveTab] = useState(1);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div>
            <p>Cechy:</p>
            <ul>
              <li>Płeć: {characterData.gender}</li>
              <li>Rasa: {characterData.race}</li>
              <li>Klasa: {characterData.classes}</li>
              <li>Podklasa: {characterData.subclasses}</li>
              <li>Charakter: {characterData.character}</li>
            </ul>
            <p>Atrybuty:</p>
            <ul>
              <li>Siła: {characterData.attributes.strength}</li>
              <li>Zręczność: {characterData.attributes.agility}</li>
              <li>Kondycja: {characterData.attributes.constitution}</li>
              <li>Inteligencja: {characterData.attributes.intelligence}</li>
              <li>Mądrość: {characterData.attributes.wisdom}</li>
              <li>Charyzma: {characterData.attributes.charisma}</li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div>
            <p>Biegłości:</p>
            <ul>
              {selectedSkills.map(({ skill, value }) => (
                <li key={skill}>
                  {skill}: {value}
                </li>
              ))}
            </ul>
            <p>Zaklęcia:</p>
            {characterData.wizardSpells.map((spell, index) => (
              <div className="d-flex flex-row" key={index} style={{ border: "1px solid gray", margin: "1px", padding: "1px" }}>
                  <img src={`http://localhost:3000/WizardSpells/WizardSpellsIcons/${spell.icon}`}/>
                  <p>{spell.rememberCount}</p>
              </div>
            ))}
            {characterData.clericSpells.map((spell, index) => (
              <div key={index} style={{ border: "1px solid gray", margin: "1px", padding: "1px" }}>
                  <img src={`http://localhost:3000/ClericSpells/ClericSpellsIcons/${spell.icon}`}/>
                  <p>{spell.rememberCount}</p>
              </div>
            ))}
            <p>Umiejętności Złodziejskie:</p>
            {Object.entries(characterData.skillsThief)      
              .map(([skillsThief, value]) => {
                const race = characterData.race || "Człowiek";
                const raceBonuses = getThievingSkillsForRace(race);
                const raceBonus = raceBonuses[skillsThief as keyof ThievingAbilities] || 0;
                const attributeBonus = getThievingAbilityBonus(skillsThief)
                
                return (
                  <div key={skillsThief}>
                    <span className='plainText'>
                      {skillsThief}:{value+raceBonus+attributeBonus} ({value}+{raceBonus}+{attributeBonus})
                    </span>
                  </div>
              );
            })}
            <p>Wróg rasowy: {characterData.racialEnemy}</p>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Statystyki: </p>
            <p>Zdrowie: {(1*characterData.level)}-{(characterData.HPdice*characterData.level)+(characterData.HPperLvBonus*characterData.level)}</p>
            <p>Kość Zdrowia: {characterData.HPdice}</p>
            <p>Bonus zdrowia na poziom: {characterData.HPperLvBonus}</p>
            <ul>
              <li>Thac0(walka wręcz): {characterData.baseThac0+characterData.melleThac0+characterData.classBonusThac0} ({characterData.baseThac0}-{characterData.melleThac0}-{characterData.classBonusThac0})</li>
              <li>Thac0(walka dystansowa): {characterData.baseThac0+characterData.rangedThac0+characterData.classBonusThac0} ({characterData.baseThac0}+{characterData.rangedThac0}+{characterData.classBonusThac0})</li>
              <li>Damage Bonus: {characterData.dmgBonus}</li>
              <li>Armor Class: {characterData.baseAC+characterData.AC-characterData.classBonusAC} ({characterData.baseAC}-{characterData.AC}-{characterData.classBonusAC})</li>
            </ul>

            <ul>
              <li>Kradzież Kieszonkowa Bonus: {characterData.Kradzież_KieszonkowaBonus}</li>
              <li>Otwieranie Zamków Bonus: {characterData.Otwieranie_ZamkówBonus}</li>
              <li>Znajdywanie Pułapek Bonus: {characterData.Znajdywanie_PułapekBonus}</li>
              <li>Ciche Poruszanie Bonus: {characterData.Ciche_PoruszanieBonus}</li>
              <li>Krycie w Cieniu Bonus: {characterData.Krycie_W_CieniuBonus}</li>
              <li>Rozstawianie Pułapek Bonus: {characterData.Rozstawianie_PułapekBonus}</li>
            </ul>

            <ul>
              <li>Maksymalny poziom zaklęć maga: {characterData.INTmaxSpellLevel}</li>
              <li>Maksymalna liczna zaklęć w księdze czarów: {characterData.INTspellPerLevel}</li>
              <li>Szansza Przepisania zwoju: {characterData.scribeSuccessRate}%</li>

              <li>Dodatkowe zaklęcią kleryka Poziom 1: {characterData.extraSpellSlotlv1}</li>
              <li>Dodatkowe zaklęcią kleryka Poziom 2: {characterData.extraSpellSlotlv2}</li>
              <li>Dodatkowe zaklęcią kleryka Poziom 3: {characterData.extraSpellSlotlv3}</li>
              <li>Dodatkowe zaklęcią kleryka Poziom 4: {characterData.extraSpellSlotlv4}</li>

              <li>
                Wiedza:{" "}
                {(characterData.WISlore) + (characterData.INTlore)}
              </li>
              <li>Wyważanie zamków: {characterData.bashing}</li>
              <li>Udźwig: {characterData.weight}</li>
              <li>Próg upojenia alkocholowego: {characterData.IntoxicationPerDrink}</li>
              <li>Zmęczenie: {characterData.fatigue}</li>
              <li>Reakcja NPC: {characterData.reaction}</li>
              <li>Zniżka w sklepach: {characterData.buyDiscount}%</li>
            </ul>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="baldurs-gate-interface mt-5">
      <p>{characterData.name} Poziom: {characterData.level}</p>
      <div className="d-flex flex-row">
        <img
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
        />
      </div>
      <div className="tabs-container">
        <div className="tabs">
          {[...Array(7)].map((_, index) => (
            <button
              key={index}
              className={`btn tab-button ${
                activeTab === index + 1 ? "active" : ""
              }`}
              onClick={() => setActiveTab(index + 1)}
            >
              Kategoria {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
  </div>
  );
};

export default SidePanel;