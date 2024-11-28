import React, { useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';

const Name: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const [nameInput, setNameInput] = useState(characterData.name || '');
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const saveName = () => {
    setCharacterData((prevData) => ({
      ...prevData,
      name: nameInput,
    }));
  };

  return (
    <div>
      <label>
        Imię postaci:
        <input
          type="text"
          value={nameInput}
          onChange={handleNameChange}
          placeholder="Wpisz imię postaci"
        />
      </label>
      <button onClick={saveName}>Zapisz imię</button>
      <p>Aktualne imię: {characterData.name || 'Brak'}</p>
    </div>
  );
};

export default Name;
