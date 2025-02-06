import React, { useEffect, useMemo, useState } from "react";
import { useExportDataContext } from "../context/ExportDataContext";
import { useCharacterContext } from "../context/CharacterContext";
import RememberWizardSpellRecord from "./RememberWizardSpellRecod";
import RememberClericSpellRecord from "./RememberClericSpellRecord";
import { ClericSpell } from "../types/CharacterData";
import ClericSpellsHelpPopup from "./popups/ClericSpellsHelpPopup";

interface ClericSpellBackend {
    id: number;
    name: string;
    school: string;
    level: number;
    descriptionFile: string;
    iconFile: string;
    hexData: string;
}

interface SpecialSkill {
    name: string;
    remember: number
}

const specialClericAbilities: Record<string, SpecialSkill[]> = {
    "Kapłan_Helma": [{name: "Prawdziwe Widzenie", remember: 2},{name: "Przeszywający Miecz", remember: 1}],
    "Kapłan_Talosa": [{name: "Burzowa Tarcza", remember: 1},{name: "Błyskawica", remember: 2}],
    "Kapłan_Lathandera": [{name: "Dar Lathandera", remember: 1},{name: "Unieruchomienie nieumarłego", remember: 2}],
    "Kapłan_Tyra": [{name: "Boskie Względy", remember: 1},{name: "Egzaltacja", remember: 2}],
    "Kapłan_Tempusa": [{name: "Bitewny Chaos", remember: 1},{name: "Święta Moc", remember: 2}],
    "Druid": [{name: "Zmiana Kształtu: Niedźwiedź Brunatny", remember: 1}, {name: "Zmiana Kształtu: Niedźwiedź Czarny", remember: 1}, {name: "Zmiana Kształtu: Wilk", remember: 1}],
    "Zmiennokształtny": [{name: "Zmiana Kształtu: Wilkołak", remember: 3},],
    "Mściciel": [{name: "Zmiana Kształtu: Niedźwiedź Brunatny", remember: 1}, {name: "Zmiana Kształtu: Niedźwiedź Czarny", remember: 1}, {name: "Zmiana Kształtu: Wilk", remember: 1}, {name: "Zmiana Kształtu: Mała Wiwerna", remember: 1}, {name: "Zmiana Kształtu: Ognista Salamandra", remember: 1}, {name: "Zmiana Kształtu: Pająk Mieczowiec", remember: 1}],
    
}

const ClericSpellsMenu: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();
    const { exportData, setExportData } = useExportDataContext();
    const selectedSubclass = characterData.subclasses;

    const [currentSpellLevel, setCurrentSpellLevel] = useState(1);
    const [ClericSpellsData, setClericSpells] = useState<ClericSpellBackend[]>([]);
        
    useEffect(() => {    
        const fetchAndInitializeData = async () => {
            try {
            
            const clericRespone = await fetch("http://localhost:3000/clericSpellData");
            if (!clericRespone.ok) {
                throw new Error(`HTTP error! status: ${clericRespone.status}`);
            }
            const clericSpells = await clericRespone.json();
        
            setClericSpells(clericSpells || {});

            for (const spell of clericSpells) {
                const spellName = spell.name;
                const spellLevel = spell.level;
                const spellSchool = spell.school;
                const spellHex = spell.hexData;
                const spellIcon = spell.iconFile;
              
                if (
                  (spellName === "Święte Uderzenie" &&
                    !(characterData.aligment.includes("Neutralny") || characterData.aligment.includes("Dobry"))) ||
                  (spellName === "Przeklęta Strefa" &&
                    !(characterData.aligment.includes("Neutralny") || characterData.aligment.includes("Zły")))
                ) {
                  continue;
                }

                if(characterData.classes === "Kapłan" && spellSchool.includes("Druida"))
                {
                  continue;
                }

                if(characterData.classes === "Druid" && spellSchool.includes("Kapłana"))
                {
                  continue;
                }

                if (spellSchool === "SPECJALNE") {
                  const subclassAbilities = specialClericAbilities[characterData.subclasses] || [];
                  const matchingAbility = subclassAbilities.find((ability) => ability.name === spellName);
                  console.log(subclassAbilities)
              
                if (!matchingAbility) {
                  continue;
                }

                  const newSpell = {
                    name: spellName,
                    level: spellLevel,
                    school: spellSchool,
                    hex: spellHex,
                    icon: spellIcon,
                    rememberCount: matchingAbility.remember,
                  };
              
                  setCharacterData((prev) => ({
                    ...prev,
                    clericSpells: [...prev.clericSpells, newSpell],
                  }));
              
                  const Hex = [
                    ...Array.from(spellHex).map((char: any) =>
                      `0x${char.charCodeAt(0).toString(16).padStart(2, "0")}`
                    ),
                    "0x00",
                    `0x${(spellLevel - 1).toString(16).padStart(2, "0")}`,
                    "0x00",
                    "0x00",
                    "0x00",
                  ];
              
                  setExportData((prev) => ({
                    ...prev,
                    clericSpell: [...prev.clericSpell, Hex],
                  }));
              
                  continue;
                }
              
                const newSpell = {
                  name: spellName,
                  level: spellLevel,
                  school: spellSchool,
                  hex: spellHex,
                  icon: spellIcon,
                  rememberCount: 0,
                };
              
                const Hex = [
                  ...Array.from(spellHex).map((char: any) =>
                    `0x${char.charCodeAt(0).toString(16).padStart(2, "0")}`
                  ),
                  "0x00",
                  `0x${(spellLevel - 1).toString(16).padStart(2, "0")}`,
                  "0x00",
                  "0x00",
                  "0x00",
                ];
              
                setCharacterData((prev) => ({
                  ...prev,
                  clericSpells: [...prev.clericSpells, newSpell],
                }));
              
                setExportData((prev) => ({
                  ...prev,
                  clericSpell: [...prev.clericSpell, Hex],
                }));
            }
        
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchAndInitializeData();
    }, [selectedSubclass]);

    const spellLevelLimits = useMemo(() => ({
        1: 3 + characterData.extraSpellSlotlv1,
        2: 3 + characterData.extraSpellSlotlv2,
        3: 2 + characterData.extraSpellSlotlv3,
        4: 1 + characterData.extraSpellSlotlv4,
      }), [characterData.extraSpellSlotlv1, characterData.extraSpellSlotlv2, characterData.extraSpellSlotlv3, characterData.extraSpellSlotlv4]);

    return(
        <>
          <div style={{ marginTop: "5px" }}><ClericSpellsHelpPopup/></div>
          <div className="creation-background">
              <div className="button-group" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                      <button className="standard-button" onClick={() => setCurrentSpellLevel(1)}>Poziom 1</button>
                      <button className="standard-button" onClick={() => setCurrentSpellLevel(2)}>Poziom 2</button>
                      <button className="standard-button" onClick={() => setCurrentSpellLevel(3)}>Poziom 3</button>
                      <button className="standard-button" onClick={() => setCurrentSpellLevel(4)}>Poziom 4</button>
              </div>
              <span>Możesz zapmaiętać {spellLevelLimits[currentSpellLevel as keyof typeof spellLevelLimits]} zaklęcia poziomu {currentSpellLevel}</span>
              <div className="d-flex flex-row" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                  <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                      {characterData.clericSpells
                          .filter((spell) => spell.level === currentSpellLevel)
                          .filter((spell) => !spell.school.includes("SPECJALNE"))
                          .map((spell, index) => (
                              <div key={index} style={{ backgroundColor: "rgb(30, 30, 30)", border: "1px solid gray", margin: "10px", padding: "10px" }}>
                                  <RememberClericSpellRecord name={spell.name} level={spell.level} iconData={spell.icon} rememberCount={spell.rememberCount} school={spell.school} />
                              </div>
                      ))}
                  </div>
              </div>
            </div>

        </>
    )
}

export default ClericSpellsMenu;