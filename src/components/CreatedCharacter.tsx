import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { CreatedCharacter } from "../pages/MainMenu";
import { CharacterAttributes, ThievingAbilities, WeaponProficiencys } from "../types/CharacterData";
import { Link } from "react-router-dom";


interface CreatedCharacterProps {
    name: string,
    race: string,
    classes: string,
    subclasses: string,
    portrait: string,
    gender: string,
    createdCharacter: CreatedCharacter,
}


const CreatedCharacterPanel: React.FC<CreatedCharacterProps> = ({name, race, classes, subclasses, portrait, gender, createdCharacter}) => {
    const [createdCharacterData, setCreatedCharacter] = useState<CreatedCharacter>()
    const [weaponsData, setWeaponsData] = useState()
    const [thievingData, setThievingData] = useState()
    const {characterData, setCharacterData} = useCharacterContext()

    const mapThievingToCharacterData = (createdCharacter: ThievingAbilities): ThievingAbilities => {
      const {
        Otwieranie_Zamkow,
        Kradziez_Kieszonkowa,
        Ciche_Poruszanie,
        Krycie_W_Cieniu,
        Znajdywanie_Pulapek,
        Wykrywanie_Iluzji,
        Rozstawianie_Pulapek,
        
      } = createdCharacter;
    
      return {
        Otwieranie_Zamkow,
        Kradziez_Kieszonkowa,
        Ciche_Poruszanie,
        Krycie_W_Cieniu,
        Znajdywanie_Pulapek,
        Wykrywanie_Iluzji,
        Rozstawianie_Pulapek,
      };
    };
    

    const mapWeaponsToCharacterData = (createdCharacter: WeaponProficiencys): WeaponProficiencys => {
      const {
        MieczePoltorareczne,
        MieczeDlugie,
        MieczeKrotkie,
        Topory,
        MieczeObureczne,
        Katany,
        SejmitarWakizashiNinjaTo,
        Sztylety,
        MlotyBojowe,
        Maczugi,
        Wlocznie,
        Halabarda,
        CepyBojoweMorgernszterny,
        Wiekiery,
        Kije,
        Kusze,
        DlugieLuki,
        KrotkieLuki,
        Strzalki,
        Proce,
        StylWalkiBroniaDwureczna,
        StylWalkiMieczemITarcza,
        StylWalkiJednaBronia,
        StylWalkiDwiemaBronmi,
        
      } = createdCharacter;
    
      return {
        MieczePoltorareczne,
        MieczeDlugie,
        MieczeKrotkie,
        Topory,
        MieczeObureczne,
        Katany,
        SejmitarWakizashiNinjaTo,
        Sztylety,
        MlotyBojowe,
        Maczugi,
        Wlocznie,
        Halabarda,
        CepyBojoweMorgernszterny,
        Wiekiery,
        Kije,
        Kusze,
        DlugieLuki,
        KrotkieLuki,
        Strzalki,
        Proce,
        StylWalkiBroniaDwureczna,
        StylWalkiMieczemITarcza,
        StylWalkiJednaBronia,
        StylWalkiDwiemaBronmi,
      };
    };
    

    const mapAttributesToCharacterData = (createdCharacter: CreatedCharacter): CharacterAttributes => {
      const {
        strength,
        strengthModifier,
        agility,
        constitution,
        intelligence,
        wisdom,
        charisma,
      } = createdCharacter;
    
      return {
        strength,
        strengthModifier,
        agility,
        constitution,
        intelligence,
        wisdom,
        charisma,
      };
    };
    
    const fetchCharacters = async () => {
      try {
        let response = await fetch("http://localhost:3000/characters");
        if(response != undefined) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCreatedCharacter(data)
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }

      try {
        let response = await fetch(`http://localhost:3000/weapons${createdCharacter.skillsId}`);
        if(response != undefined) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setWeaponsData(data)
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }

      try {
        let response = await fetch(`http://localhost:3000/thieving${createdCharacter.skillsThiefId}`);
        if(response != undefined) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setThievingData(data)
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    
    useEffect(() => {
      fetchCharacters()
    },[])
    


    const loadSavedCharacter = () => {
      if (createdCharacterData && weaponsData && thievingData){
        const updatedAttributes = mapAttributesToCharacterData(createdCharacter);
        const updatedWeapons = mapWeaponsToCharacterData(weaponsData);
        const updatedThieving = mapThievingToCharacterData(thievingData);

        setCharacterData((prevData) => ({
          ...prevData,
          level: createdCharacter.level,
          name: createdCharacter.name,
          gender: createdCharacter.gender,
          portrait: createdCharacter.portrait,
          race: createdCharacter.race,
          classes: createdCharacter.classes,
          subclasses: createdCharacter.subclasses,
          aligment: createdCharacter.aligment,
          skills: updatedWeapons,
          skillsThief: updatedThieving,
          //WIZARD/CLERIC SPELLS !!!!!!!
          attributes: updatedAttributes,
          racialEnemy: createdCharacter.racialEnemy,
          baseThac0: createdCharacter.baseThac0,
          melleThac0: createdCharacter.melleThac0,
          classBonusThac0: createdCharacter.classBonusThac0,
          dmgBonus: createdCharacter.dmgBonus,
          bashing: createdCharacter.bashing,
          weight: createdCharacter.wisdom,
          rangedThac0: createdCharacter.rangedThac0,
          baseAC: createdCharacter.baseAC,
          AC: createdCharacter.AC,
          classBonusAC: createdCharacter.classBonusAC,
          Kradzież_KieszonkowaBonus: createdCharacter.Kradziez_KieszonkowaBonus,
          Otwieranie_ZamkówBonus: createdCharacter.Otwieranie_ZamkowBonus,
          Znajdywanie_PułapekBonus: createdCharacter.Znajdywanie_PulapekBonus,
          Ciche_PoruszanieBonus: createdCharacter.Ciche_PoruszanieBonus,
          Krycie_W_CieniuBonus: createdCharacter.Kradziez_KieszonkowaBonus,
          Rozstawianie_PułapekBonus: createdCharacter.Rozstawianie_PulapekBonus,
          HPdice: createdCharacter.HPdice,
          HPperLvBonus: createdCharacter.HPperLvBonus,
          IntoxicationPerDrink: createdCharacter.IntoxicationPerDrink,
          fatigue: createdCharacter.fatigue,
          INTmaxSpellLevel: createdCharacter.INTmaxSpellLevel,
          INTspellPerLevel: createdCharacter.INTspellPerLevel,
          scribeSuccessRate: createdCharacter.scribeSuccessRate,
          INTlore: createdCharacter.INTlore,
          extraSpellSlotlv1: createdCharacter.extraSpellSlotlv1,
          extraSpellSlotlv2: createdCharacter.extraSpellSlotlv2,
          extraSpellSlotlv3: createdCharacter.extraSpellSlotlv3,
          extraSpellSlotlv4: createdCharacter.extraSpellSlotlv4,
          WISlore: createdCharacter.WISlore,
          reaction: createdCharacter.reaction,
          buyDiscount: createdCharacter.buyDiscount,
          bonuses: createdCharacter.bonuses
        }));
      }
    }
  
    return (
      <div className="vertical-rectangle">
      <img 
        className="character-rectangle-button"
        src={
          gender === "Mężczyzna"
            ? `http://localhost:3000/MalePortraits/${portrait}`
            : `http://localhost:3000/FemalePortraits/${portrait}`
        }
        alt={portrait}
      />
      <div className="character-rectangle-text">
        {name}<br />
        Płeć: {gender}<br/>
        Rasa: {race}<br/>
        Klasa: {classes}<br/>
        Podklasa: {subclasses}<br/>
      </div>
      <div className="d-flex flex-column" style={{marginLeft: "5px"}}>
        <Link className="standard-button" onClick={loadSavedCharacter} to={"/CharacterCreation"}>Edytuj Postać</Link>
      </div>
    </div>
    );
}


export default CreatedCharacterPanel;