import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { CreatedCharacter } from "../pages/MainMenu";


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
    const [createdCharacterData, setCreatedCharacter] = useState()
    const [weaponsData, setWeaponsData] = useState()
    const [thievingData, setThievingData] = useState()
    const {characterData, setCharacterData} = useCharacterContext()
    
    
    const fetchCharacters = async () => {
      try {
        let response = await fetch("http://localhost:3000/characters");
        if(response != undefined) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCreatedCharacter(data)
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }

      try {
        let response = await fetch(`http://localhost:3000/weapons/$${createdCharacter.skillsId}`);
        if(response != undefined) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setWeaponsData(data)
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }

      try {
        let response = await fetch(`http://localhost:3000/thieving/${createdCharacter.skillsThiefId}`);
        if(response != undefined) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setThievingData(data)
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    
    useEffect(() => {
      fetchCharacters()
    },[])
    
    const log = () => {
      console.log(createdCharacterData)
      console.log(weaponsData)
      console.log(thievingData)
    }

    const loadSavedCharacter = () => {
      
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
        Płeć: {gender}<br />
        Rasa: {race}<br />
        Klasa: {classes}<br />
        Podklasa: {subclasses}<br />
      </div>
      <div className="d-flex flex-column" style={{marginLeft: "5px"}}>
        <button className="standard-button" onClick={log}>Edytuj Postać</button>
        <button className="standard-button">Pobierz Postać</button>
      </div>
    </div>
    );
}


export default CreatedCharacterPanel;