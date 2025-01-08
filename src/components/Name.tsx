import React, { useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';

const Name: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const { exportData, setExportData } = useExportDataContext();
  const [nameInput, setNameInput] = useState(characterData.name || '');
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const saveName = () => {

    const nameHex = Array.from(nameInput).map((char) =>
      char.charCodeAt(0).toString(16)
    );

    console.log(nameHex)
    setExportData((prevData) => ({
      ...prevData,
      name: nameHex,
    }))

    setCharacterData((prevData) => ({
      ...prevData,
      name: nameInput,
    }));
  };

  return (
    <div className='creation-background'>
      <label className='secondary-text'>
        Imię postaci:
        <input
          className='textBox'
          type="text"
          value={nameInput}
          onChange={handleNameChange}
          placeholder="Wpisz imię postaci"
          maxLength={19}
        />
      </label>
      <button className="standard-button" onClick={saveName}>Zapisz imię</button>
      <span>Aktualne imię: {characterData.name || '<Brak>'}</span>
    </div>
  );
};

export default Name;
