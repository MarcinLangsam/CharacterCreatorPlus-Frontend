import React from "react";

interface CreatedCharacterProps {
    name: string,
    race: string,
    classes: string,
    subclasses: string,
    portrait: string,
    gender: string,
}


const CreatedCharacter: React.FC<CreatedCharacterProps> = ({name, race, classes, subclasses, portrait, gender}) => {
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
            {name}<br/>
            Płeć: {gender}<br/>
            Rasa: {race}<br/>
            Klasa: {classes}<br/>
            Podklasa: {subclasses}<br/>
          </div>
        </div>
      );
}


export default CreatedCharacter;