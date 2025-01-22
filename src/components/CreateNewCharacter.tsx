import React from "react";
import { Link } from "react-router-dom";

const CharacterNewCharacter: React.FC = () => {
    return (
        <div className="vertical-rectangle">
            <Link className="vertical-rectangle-button" to="/CharacterCreation">+</Link>
          <div className="vertical-rectangle-text">
            Stwórz<br/>
            Nową<br/>
            Postać<br/>
          </div>
        </div>
      );
}


export default CharacterNewCharacter;