import React from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { WeaponProficiencys } from "../types/CharacterData";
import StatControl from "./ProficiencysControl";

const Skills: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();

  const updateAttribute = (skills: keyof WeaponProficiencys, delta: number) => {
    setCharacterData((prevData) => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        [skills]: prevData.skills[skills] + delta,
      },
    }));
  };

  return (
    <div>
      <h2>Set Proficiencys</h2>
      <StatControl
        statName="BastardSword"
        statValue={characterData.attributes.strength}
        onIncrement={() => updateAttribute('BastardSword', 1)}
        onDecrement={() => updateAttribute('BastardSword', -1)}
      />
      <StatControl
        statName="LongSword"
        statValue={characterData.attributes.agility}
        onIncrement={() => updateAttribute('LongSword', 1)}
        onDecrement={() => updateAttribute('LongSword', -1)}
      />
      <StatControl
        statName="ShortSword"
        statValue={characterData.attributes.constitution}
        onIncrement={() => updateAttribute('ShortSword', 1)}
        onDecrement={() => updateAttribute('ShortSword', -1)}
      />
      <StatControl
        statName="Axe"
        statValue={characterData.attributes.intelligence}
        onIncrement={() => updateAttribute('Axe', 1)}
        onDecrement={() => updateAttribute('Axe', -1)}
      />
      <StatControl
        statName="TwoHandedSword"
        statValue={characterData.attributes.wisdom}
        onIncrement={() => updateAttribute('TwoHandedSword', 1)}
        onDecrement={() => updateAttribute('TwoHandedSword', -1)}
      />
      <StatControl
        statName="Katana"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Katana', 1)}
        onDecrement={() => updateAttribute('Katana', -1)}
      />
      <StatControl
        statName="Scimtar"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Scimtar', 1)}
        onDecrement={() => updateAttribute('Scimtar', -1)}
      />
      <StatControl
        statName="Dagger"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Dagger', 1)}
        onDecrement={() => updateAttribute('Dagger', -1)}
      />
      <StatControl
        statName="WarHammer"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('WarHammer', 1)}
        onDecrement={() => updateAttribute('WarHammer', -1)}
      />
      <StatControl
        statName="Club"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Club', 1)}
        onDecrement={() => updateAttribute('Club', -1)}
      />
      <StatControl
        statName="Spear"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Spear', 1)}
        onDecrement={() => updateAttribute('Spear', -1)}
      />
      <StatControl
        statName="Halberd"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Halberd', 1)}
        onDecrement={() => updateAttribute('Halberd', -1)}
      />
      <StatControl
        statName="Flail"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Flail', 1)}
        onDecrement={() => updateAttribute('Flail', -1)}
      />
      <StatControl
        statName="Mace"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Mace', 1)}
        onDecrement={() => updateAttribute('Mace', -1)}
      />
      <StatControl
        statName="QuarterStaff"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('QuarterStaff', 1)}
        onDecrement={() => updateAttribute('QuarterStaff', -1)}
      />
      <StatControl
        statName="Crossbow"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Crossbow', 1)}
        onDecrement={() => updateAttribute('Crossbow', -1)}
      />
      <StatControl
        statName="LongBow"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('LongBow', 1)}
        onDecrement={() => updateAttribute('LongBow', -1)}
      />
      <StatControl
        statName="ShortBow"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('ShortBow', 1)}
        onDecrement={() => updateAttribute('ShortBow', -1)}
      />
      <StatControl
        statName="Dart"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Dart', 1)}
        onDecrement={() => updateAttribute('Dart', -1)}
      />
      <StatControl
        statName="Sling"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('Sling', 1)}
        onDecrement={() => updateAttribute('Sling', -1)}
      />
      <StatControl
        statName="TwoHandedWeaponStyle"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('TwoHandedWeaponStyle', 1)}
        onDecrement={() => updateAttribute('TwoHandedWeaponStyle', -1)}
      />
      <StatControl
        statName="SwordandShieldStyle"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('SwordandShieldStyle', 1)}
        onDecrement={() => updateAttribute('SwordandShieldStyle', -1)}
      />
      <StatControl
        statName="SingleWeaponStyle"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('SingleWeaponStyle', 1)}
        onDecrement={() => updateAttribute('SingleWeaponStyle', -1)}
      />
      <StatControl
        statName="TwoWeaponStyle"
        statValue={characterData.attributes.charisma}
        onIncrement={() => updateAttribute('TwoWeaponStyle', 1)}
        onDecrement={() => updateAttribute('TwoWeaponStyle', -1)}
      />
    </div>
  )
}

export default Skills;