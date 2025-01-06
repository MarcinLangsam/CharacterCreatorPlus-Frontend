import React, { useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';

interface WizardSpellRecordProps {
    name: string;
    level: number;
    iconData: string;
    rememberCount: number;
}


const RememberWizardSpellRecord: React.FC<WizardSpellRecordProps>  = ({name, level, iconData, rememberCount }) => {
    
  const { characterData, setCharacterData } = useCharacterContext();
  const {exportData, setExportData} = useExportDataContext();

  const spellLevelLimits: Record<number, number> = {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
  };

  const handleRememberWizardSpell = () => {
    const currentRememberedSpells = characterData.wizardSpells
      .filter((spell) => spell.level === level)
      .reduce((sum, spell) => sum + spell.rememberCount, 0);

    if (currentRememberedSpells >= spellLevelLimits[level]) {
      console.log(`Limit for level ${level} spells reached.`);
      return;
    }

    setCharacterData((prev) => {
        const updatedSpells = prev.wizardSpells.map((spell) => {
          if (spell.name === name) {
            return { ...spell, rememberCount: spell.rememberCount + 1 };
          }
          return spell;
        });
        return { ...prev, wizardSpells: updatedSpells };
      });
  };

  const handleForgetWizardSpell = () => {
    setCharacterData((prev) => {
        const updatedSpells = prev.wizardSpells.map((spell) => {
          if (spell.name === name && spell.rememberCount > 0) {
            return { ...spell, rememberCount: spell.rememberCount - 1 };
          }
          return spell;
        });
        return { ...prev, wizardSpells: updatedSpells };
      });
  };
    
  return(
      <div>
          <img 
              src={`http://localhost:3000/WizardSpells/WizardSpellsIcons/${iconData}`}
              alt="Wizard Spell Icon"
              style={{maxWidth: "50px", maxHeight: "50px"}}    
          />
          <p>{name} Zapamiętanie:{rememberCount}</p>
          <button className="statsButton" onClick={handleRememberWizardSpell}>+</button>
          <button className="statsButton" onClick={handleForgetWizardSpell}>-</button>
      </div>
  )
}

export default RememberWizardSpellRecord;
