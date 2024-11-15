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
      <h2>Wybierz Biegłóści</h2>
      <StatControl
        statName="Miecze Półtoraręczne"
        statValue={characterData.skills.BastardSword}
        onIncrement={() => updateAttribute('BastardSword', 1)}
        onDecrement={() => updateAttribute('BastardSword', -1)}
      />
      <StatControl
        statName="Miecze Długie"
        statValue={characterData.skills.LongSword}
        onIncrement={() => updateAttribute('LongSword', 1)}
        onDecrement={() => updateAttribute('LongSword', -1)}
      />
      <StatControl
        statName="Miecze Krótkie"
        statValue={characterData.skills.ShortSword}
        onIncrement={() => updateAttribute('ShortSword', 1)}
        onDecrement={() => updateAttribute('ShortSword', -1)}
      />
      <StatControl
        statName="Topory"
        statValue={characterData.skills.Axe}
        onIncrement={() => updateAttribute('Axe', 1)}
        onDecrement={() => updateAttribute('Axe', -1)}
      />
      <StatControl
        statName="Miecze Dwóręczne"
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
        statName="Sztylety"
        statValue={characterData.skills.Dagger}
        onIncrement={() => updateAttribute('Dagger', 1)}
        onDecrement={() => updateAttribute('Dagger', -1)}
      />
      <StatControl
        statName="Młoty Wojenne"
        statValue={characterData.skills.WarHammer}
        onIncrement={() => updateAttribute('WarHammer', 1)}
        onDecrement={() => updateAttribute('WarHammer', -1)}
      />
      <StatControl
        statName="Maczugi"
        statValue={characterData.skills.Club}
        onIncrement={() => updateAttribute('Club', 1)}
        onDecrement={() => updateAttribute('Club', -1)}
      />
      <StatControl
        statName="Włócznie"
        statValue={characterData.skills.Spear}
        onIncrement={() => updateAttribute('Spear', 1)}
        onDecrement={() => updateAttribute('Spear', -1)}
      />
      <StatControl
        statName="Halabarda"
        statValue={characterData.skills.Halberd}
        onIncrement={() => updateAttribute('Halberd', 1)}
        onDecrement={() => updateAttribute('Halberd', -1)}
      />
      <StatControl
        statName="Korbacze"
        statValue={characterData.skills.Flail}
        onIncrement={() => updateAttribute('Flail', 1)}
        onDecrement={() => updateAttribute('Flail', -1)}
      />
      <StatControl
        statName="Wiekiery"
        statValue={characterData.skills.Mace}
        onIncrement={() => updateAttribute('Mace', 1)}
        onDecrement={() => updateAttribute('Mace', -1)}
      />
      <StatControl
        statName="Kije bojowe"
        statValue={characterData.skills.QuarterStaff}
        onIncrement={() => updateAttribute('QuarterStaff', 1)}
        onDecrement={() => updateAttribute('QuarterStaff', -1)}
      />
      <StatControl
        statName="Kusze"
        statValue={characterData.skills.Crossbow}
        onIncrement={() => updateAttribute('Crossbow', 1)}
        onDecrement={() => updateAttribute('Crossbow', -1)}
      />
      <StatControl
        statName="Długie Łuki"
        statValue={characterData.skills.LongBow}
        onIncrement={() => updateAttribute('LongBow', 1)}
        onDecrement={() => updateAttribute('LongBow', -1)}
      />
      <StatControl
        statName="Krótkie Łuki"
        statValue={characterData.skills.ShortBow}
        onIncrement={() => updateAttribute('ShortBow', 1)}
        onDecrement={() => updateAttribute('ShortBow', -1)}
      />
      <StatControl
        statName="Strzałki"
        statValue={characterData.skills.Dart}
        onIncrement={() => updateAttribute('Dart', 1)}
        onDecrement={() => updateAttribute('Dart', -1)}
      />
      <StatControl
        statName="Proce"
        statValue={characterData.skills.Sling}
        onIncrement={() => updateAttribute('Sling', 1)}
        onDecrement={() => updateAttribute('Sling', -1)}
      />
      <StatControl
        statName="Styl Broni Dwóręcznych"
        statValue={characterData.skills.TwoHandedWeaponStyle}
        onIncrement={() => updateAttribute('TwoHandedWeaponStyle', 1)}
        onDecrement={() => updateAttribute('TwoHandedWeaponStyle', -1)}
      />
      <StatControl
        statName="Styl Miecza i Tarczy"
        statValue={characterData.skills.SwordandShieldStyle}
        onIncrement={() => updateAttribute('SwordandShieldStyle', 1)}
        onDecrement={() => updateAttribute('SwordandShieldStyle', -1)}
      />
      <StatControl
        statName="Styl Miecza Jednoręcznego"
        statValue={characterData.skills.SingleWeaponStyle}
        onIncrement={() => updateAttribute('SingleWeaponStyle', 1)}
        onDecrement={() => updateAttribute('SingleWeaponStyle', -1)}
      />
      <StatControl
        statName="Styl Podwójnych Broni"
        statValue={characterData.skills.TwoWeaponStyle}
        onIncrement={() => updateAttribute('TwoWeaponStyle', 1)}
        onDecrement={() => updateAttribute('TwoWeaponStyle', -1)}
      />
    </div>
  )
}

export default Skills;