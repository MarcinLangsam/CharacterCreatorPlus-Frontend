import React, { useEffect, useMemo } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';

interface ClericSpellRecordProps {
    name: string;
    level: number;
    school: string;
    iconData: string;
    rememberCount: number;
}

const RememberClericSpellRecord: React.FC<ClericSpellRecordProps>  = ({name, level, school, iconData, rememberCount }) => {
    
  const { characterData, setCharacterData } = useCharacterContext();
  const {exportData, setExportData} = useExportDataContext();

  const spellLevelLimits = useMemo(() => ({
    1: 3 + characterData.extraSpellSlotlv1,
    2: 3 + characterData.extraSpellSlotlv2,
    3: 2 + characterData.extraSpellSlotlv3,
    4: 1 + characterData.extraSpellSlotlv4,
  }), [characterData.extraSpellSlotlv1, characterData.extraSpellSlotlv2, characterData.extraSpellSlotlv3, characterData.extraSpellSlotlv4]);

  const handleRememberClericSpell = () => {
    const currentRememberedSpells = characterData.clericSpells
      .filter((spell) => spell.level === level)
      .reduce((sum, spell) => sum + spell.rememberCount, 0);

    if (currentRememberedSpells >= spellLevelLimits[level as keyof typeof spellLevelLimits]) {
      console.log(`Limit for level ${level} spells reached.`);
      return;
    }

    setCharacterData((prev) => {
        const updatedSpells = prev.clericSpells.map((spell) => {
          if (spell.name === name) {
            return { ...spell, rememberCount: spell.rememberCount + 1 };
          }
          return spell;
        });
        return { ...prev, clericSpells: updatedSpells };
    });
  };

  const handleForgetClericSpell = () => { 
    setCharacterData((prev) => {
        const updatedSpells = prev.clericSpells.map((spell) => {
          if (spell.name === name && spell.rememberCount > 0) {
            return { ...spell, rememberCount: spell.rememberCount - 1 };
          }
          return spell;
        });
        return { ...prev, clericSpells: updatedSpells };
      });
  };
    
  return(
      <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
          <img 
              src={`http://localhost:3000/ClericSpells/ClericSpellsIcons/${iconData}`}
              alt="Cleric Spell Icon"
              style={{maxWidth: "50px", maxHeight: "50px"}}    
          />
          <span>{name}</span><br/>
          <span>{school}</span><br/>
          <span>Zapamiętanie:{rememberCount}</span><br/>
          <button className="attributes-button" onClick={handleRememberClericSpell}>+</button>
          <button className="attributes-button" onClick={handleForgetClericSpell}>-</button>
      </div>
  )
}

export default RememberClericSpellRecord;
