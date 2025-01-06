import React, { useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';

interface WizardSpellRecordProps {
    name: string;
    school: string;
    level: number;
    iconData: string;
    hexData: string;
}


const WizardSpellRecord: React.FC<WizardSpellRecordProps>  = ({name, school, level, iconData, hexData }) => {
    
  const { characterData, setCharacterData } = useCharacterContext();
  const {exportData, setExportData} = useExportDataContext();

  const handleAddWizardSpell = () => {
    const spellLevelLimits: { [key: number]: number } = {
      1: 5,
      2: 4,
      3: 3,
      4: 2,
    };
    
  
    const currentLevelSpells = characterData.wizardSpells.filter(
      (spell) => spell.level === level
    );
  
    if (currentLevelSpells.length >= spellLevelLimits[level]) {
      console.log(`You cannot select more than ${spellLevelLimits[level]} spells for level ${level}.`);
      return;
    }

    if (characterData.wizardSpells.some((spell) => spell.name === name)) {
      console.log("Spell already added.");
      return;
    }

    const newSpell = { name, level, school, hex: hexData, icon: iconData, rememberCount: 0 };
    const spellHex = [
      ...Array.from(newSpell.hex).map((char) =>
        `0x${char.charCodeAt(0).toString(16).padStart(2, "0")}`
      ),
      "0x00",
      `0x${(newSpell.level - 1).toString(16).padStart(2, "0")}`,
      "0x00",
      "0x01",
      "0x00",
    ];

    setCharacterData((prev) => ({
      ...prev,
      wizardSpells: [...prev.wizardSpells, newSpell],
    }));

    setExportData((prev) => ({
      ...prev,
      wizardSpell: [...prev.wizardSpell, spellHex]
    }))

    
  };

  const handleRemoveWizardSpell = () => {
    setCharacterData((prev) => ({
      ...prev,
      wizardSpells: prev.wizardSpells.filter((spell) => spell.name !== name),
    }));
  };
    

  return(
      <div>
          <img 
              src={`http://localhost:3000/WizardSpells/WizardSpellsIcons/${iconData}`}
              alt="Wizard Spell Icon"
              style={{maxWidth: "50px", maxHeight: "50px"}}    
          />
          <p>Nazwa: {name}, Szkola: {school}, Poziom: {level}, Hex: {hexData}</p>
          <button className="statsButton" onClick={handleAddWizardSpell}>+</button>
          <button className="statsButton" onClick={handleRemoveWizardSpell}>-</button>
      </div>
  )
}

export default WizardSpellRecord;
