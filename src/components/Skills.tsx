import React from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { WeaponProficiencys } from "../types/CharacterData";
import StatControl from "./ProficiencysControl";

const Skills: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();

  const updateAttribute = (skills: keyof WeaponProficiencys, delta: number) => {
    setCharacterData((prevData) => {
      const newValue = prevData.skills[skills] + delta;

      const clampedValue = Math.max(0, Math.min(5, newValue));

      return {
        ...prevData,
        skills: {
          ...prevData.skills,
          [skills]: clampedValue,
        }
      }
    });
  };

  return (
    <div>
      <h2>Set Proficiencys</h2>
      <StatControl
        statName="BastardSword"
        statValue={characterData.skills.BastardSword}
        onIncrement={() => updateAttribute('BastardSword', 1)}
        onDecrement={() => updateAttribute('BastardSword', -1)}
      />
      <StatControl
        statName="LongSword"
        statValue={characterData.skills.LongSword}
        onIncrement={() => updateAttribute('LongSword', 1)}
        onDecrement={() => updateAttribute('LongSword', -1)}
      />
      <StatControl
        statName="ShortSword"
        statValue={characterData.skills.ShortSword}
        onIncrement={() => updateAttribute('ShortSword', 1)}
        onDecrement={() => updateAttribute('ShortSword', -1)}
      />
      <StatControl
        statName="Axe"
        statValue={characterData.skills.Axe}
        onIncrement={() => updateAttribute('Axe', 1)}
        onDecrement={() => updateAttribute('Axe', -1)}
      />
      <StatControl
        statName="TwoHandedSword"
        statValue={characterData.skills.TwoHandedSword}
        onIncrement={() => updateAttribute('TwoHandedSword', 1)}
        onDecrement={() => updateAttribute('TwoHandedSword', -1)}
      />
      <StatControl
        statName="Katana"
        statValue={characterData.skills.Katana}
        onIncrement={() => updateAttribute('Katana', 1)}
        onDecrement={() => updateAttribute('Katana', -1)}
      />
      <StatControl
        statName="Scimtar"
        statValue={characterData.skills.Scimtar}
        onIncrement={() => updateAttribute('Scimtar', 1)}
        onDecrement={() => updateAttribute('Scimtar', -1)}
      />
      <StatControl
        statName="Dagger"
        statValue={characterData.skills.Dagger}
        onIncrement={() => updateAttribute('Dagger', 1)}
        onDecrement={() => updateAttribute('Dagger', -1)}
      />
      <StatControl
        statName="WarHammer"
        statValue={characterData.skills.WarHammer}
        onIncrement={() => updateAttribute('WarHammer', 1)}
        onDecrement={() => updateAttribute('WarHammer', -1)}
      />
      <StatControl
        statName="Club"
        statValue={characterData.skills.Club}
        onIncrement={() => updateAttribute('Club', 1)}
        onDecrement={() => updateAttribute('Club', -1)}
      />
      <StatControl
        statName="Spear"
        statValue={characterData.skills.Spear}
        onIncrement={() => updateAttribute('Spear', 1)}
        onDecrement={() => updateAttribute('Spear', -1)}
      />
      <StatControl
        statName="Halberd"
        statValue={characterData.skills.Halberd}
        onIncrement={() => updateAttribute('Halberd', 1)}
        onDecrement={() => updateAttribute('Halberd', -1)}
      />
      <StatControl
        statName="Flail"
        statValue={characterData.skills.Flail}
        onIncrement={() => updateAttribute('Flail', 1)}
        onDecrement={() => updateAttribute('Flail', -1)}
      />
      <StatControl
        statName="Mace"
        statValue={characterData.skills.Mace}
        onIncrement={() => updateAttribute('Mace', 1)}
        onDecrement={() => updateAttribute('Mace', -1)}
      />
      <StatControl
        statName="QuarterStaff"
        statValue={characterData.skills.QuarterStaff}
        onIncrement={() => updateAttribute('QuarterStaff', 1)}
        onDecrement={() => updateAttribute('QuarterStaff', -1)}
      />
      <StatControl
        statName="Crossbow"
        statValue={characterData.skills.Crossbow}
        onIncrement={() => updateAttribute('Crossbow', 1)}
        onDecrement={() => updateAttribute('Crossbow', -1)}
      />
      <StatControl
        statName="LongBow"
        statValue={characterData.skills.LongBow}
        onIncrement={() => updateAttribute('LongBow', 1)}
        onDecrement={() => updateAttribute('LongBow', -1)}
      />
      <StatControl
        statName="ShortBow"
        statValue={characterData.skills.ShortBow}
        onIncrement={() => updateAttribute('ShortBow', 1)}
        onDecrement={() => updateAttribute('ShortBow', -1)}
      />
      <StatControl
        statName="Dart"
        statValue={characterData.skills.Dart}
        onIncrement={() => updateAttribute('Dart', 1)}
        onDecrement={() => updateAttribute('Dart', -1)}
      />
      <StatControl
        statName="Sling"
        statValue={characterData.skills.Sling}
        onIncrement={() => updateAttribute('Sling', 1)}
        onDecrement={() => updateAttribute('Sling', -1)}
      />
      <StatControl
        statName="TwoHandedWeaponStyle"
        statValue={characterData.skills.TwoHandedWeaponStyle}
        onIncrement={() => updateAttribute('TwoHandedWeaponStyle', 1)}
        onDecrement={() => updateAttribute('TwoHandedWeaponStyle', -1)}
      />
      <StatControl
        statName="SwordandShieldStyle"
        statValue={characterData.skills.SwordandShieldStyle}
        onIncrement={() => updateAttribute('SwordandShieldStyle', 1)}
        onDecrement={() => updateAttribute('SwordandShieldStyle', -1)}
      />
      <StatControl
        statName="SingleWeaponStyle"
        statValue={characterData.skills.SingleWeaponStyle}
        onIncrement={() => updateAttribute('SingleWeaponStyle', 1)}
        onDecrement={() => updateAttribute('SingleWeaponStyle', -1)}
      />
      <StatControl
        statName="TwoWeaponStyle"
        statValue={characterData.skills.TwoWeaponStyle}
        onIncrement={() => updateAttribute('TwoWeaponStyle', 1)}
        onDecrement={() => updateAttribute('TwoWeaponStyle', -1)}
      />
    </div>
  )
}

export default Skills;