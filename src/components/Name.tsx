import React, { useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';

const Name: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const { exportData, setExportData } = useExportDataContext();
  const [error, setError] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState(characterData.name || '');
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const saveName = () => {

    if (nameInput.length > 19) {
      setError('Imię może zawierać maksymalnie 19 znaków');
      return;
    }

    setError(null);

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
      <span>Aktualne imię: {characterData.name || '<Brak>'}</span><br/>
      <span>Imię postaic może zawierać maksymalnie 19 znaków</span>
      {error && (
            <div style={{ marginTop: '10px', color: 'red' }}>
              <strong>Uwaga:</strong> {error}
            </div>
      )}
    </div>
  );
};

export default Name;
