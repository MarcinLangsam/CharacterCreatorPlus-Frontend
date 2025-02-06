import React, { useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';

interface SorcererAndShamanSpellRecordProps {
    name: string;
    school: string;
    level: number;
    iconData: string;
    hexData: string;
}

const SorcererAndShamanSpellRecord: React.FC<SorcererAndShamanSpellRecordProps>  = ({name, school, level, iconData, hexData }) => {
    
  const { characterData, setCharacterData } = useCharacterContext();
  const {exportData, setExportData} = useExportDataContext();

  const handleAddSorcererAndShamanSpell = () => {
    const spellLevelLimits: { [key: number]: number } = {
      1: 5,
      2: 4,
      3: 3,
      4: 2,
    };
    
    let currentLevelSpells = []
    if(characterData.classes === "Czarownik") {
       currentLevelSpells = characterData.wizardSpells.filter(
        (spell) => spell.level === level
      );
    
    }
    else if(characterData.classes === "Szaman"){
      currentLevelSpells = characterData.clericSpells.filter(
        (spell) => spell.level === level
      );
    }
  
    if (currentLevelSpells.length >= spellLevelLimits[level]) {
      console.log(`You cannot select more than ${spellLevelLimits[level]} spells for level ${level}.`);
      return;
    }

    if (characterData.wizardSpells.some((spell) => spell.name === name)) {
      console.log("Spell already added.");
      return;
    }

    if (characterData.clericSpells.some((spell) => spell.name === name)) {
      console.log("Spell already added.");
      return;
    }

    let remember = 0
    if(level === 1 || level === 2) {remember = 6}
    if(level === 3) {remember = 4}
    const newSpell = { name, level, school, hex: hexData, icon: iconData, rememberCount: remember };
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

    if(characterData.classes === "Czarownik")
    {
      setCharacterData((prev) => ({
          ...prev,
          wizardSpells: [...prev.wizardSpells, newSpell],
      }));
    
      setExportData((prev) => ({
        ...prev,
        wizardSpell: [...prev.wizardSpell, spellHex]
      }))
    }
    else if (characterData.classes === "Szaman")
    {
      setCharacterData((prev) => ({
        ...prev,
        clericSpells: [...prev.clericSpells, newSpell],
      }));
      
      setExportData((prev) => ({
        ...prev,
        clericSpell: [...prev.clericSpell, spellHex],
      }));
    }

    console.log(characterData.clericSpells)

  };

  const handleRemoveSorcererAndShamanSpell = () => {
    if(characterData.classes === "Czarownik")
    {
        setCharacterData((prev) => ({
            ...prev,
            wizardSpells: prev.wizardSpells.filter((spell) => spell.name !== name),
            }));
    }
    else if (characterData.classes === "Szaman")
    {
        setCharacterData((prev) => ({
            ...prev,
            clericSpells: prev.clericSpells.filter((spell) => spell.name !== name),
            }));
    }
  };

  
    

  return(
      <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
          <img 
              src={characterData.classes === "Czarownik"
                ? `http://localhost:3000/WizardSpells/WizardSpellsIcons/${iconData}`
                : `http://localhost:3000/ClericSpells/ClericSpellsIcons/${iconData}`}
                alt="Spell Icon"
              style={{maxWidth: "50px", maxHeight: "50px"}}    
          />
            <span>Nazwa: {name}, Szkola: {school}</span>
            <button className="attributes-button" onClick={handleAddSorcererAndShamanSpell}>+</button>
            <button className="attributes-button" onClick={handleRemoveSorcererAndShamanSpell}>-</button>
      </div>
  )
}

export default SorcererAndShamanSpellRecord;
