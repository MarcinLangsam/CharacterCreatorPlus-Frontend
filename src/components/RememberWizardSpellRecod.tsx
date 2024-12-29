import React, { useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';

interface WizardSpellRecordProps {
    name: string;
    iconData: string;
}


const RememberWizardSpellRecord: React.FC<WizardSpellRecordProps>  = ({name, iconData }) => {
    
  const { characterData, setCharacterData } = useCharacterContext();
  const {exportData, setExportData} = useExportDataContext();

  const handleRememberWizardSpell = () => {
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
          <p>{name}</p>
          <button className="statsButton" onClick={handleRememberWizardSpell}>+</button>
          <button className="statsButton" onClick={handleForgetWizardSpell}>-</button>
      </div>
  )
}

export default RememberWizardSpellRecord;
