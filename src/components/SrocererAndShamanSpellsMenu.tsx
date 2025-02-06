import React, { useEffect, useState } from "react";
import { useExportDataContext } from "../context/ExportDataContext";
import { useCharacterContext } from "../context/CharacterContext";
import SorcererAndShamanSpellRecord from "./SorcererAndShamanSpellRecord";
import SorcererShamanSpellsHelpPopup from "./popups/SorcererShamanSpellHelpPopup";

interface SorcererShamanSpellBackend {
    id: number;
    name: string;
    school: string;
    level: number;
    descriptionFile: string;
    iconFile: string;
    hexData: string;
}

const SrocererAndShamanSpellsMenu: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();
    const { exportData, setExportData } = useExportDataContext();
    const selectedSubclass = characterData.subclasses;

    const [currentSpellLevel, setCurrentSpellLevel] = useState(1);
    const [SorcererShamanSpellData, setSorcererShamanSpell] = useState<SorcererShamanSpellBackend[]>([]);
        
    useEffect(() => {    
        const fetchAndInitializeData = async () => {
            try {
            let spellResponse = undefined
            if(characterData.subclasses === "Czarownik") { spellResponse = await fetch("http://localhost:3000/wizardSpellData"); }
            if(characterData.subclasses === "Szaman") { spellResponse = await fetch("http://localhost:3000/clericSpellData"); }
            
            if(spellResponse != undefined) {
                if (!spellResponse.ok) {
                    throw new Error(`HTTP error! status: ${spellResponse.status}`);
                }
                const spells = await spellResponse.json();
            
                setSorcererShamanSpell(spells || {});
            }
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
        
        fetchAndInitializeData();
    }, [selectedSubclass]);

    const spellLevelLimits: { [key: number]: number } = {
        1: 5,
        2: 4,
        3: 3,
        4: 2,
    };
    
    let selectedSpellsCount = 0
    if(characterData.classes === "Czarownik"){
        selectedSpellsCount = characterData.wizardSpells.filter(
            (spell) => spell.level === currentSpellLevel
        ).length;
    }

    if(characterData.classes === "Szaman"){
        selectedSpellsCount = characterData.clericSpells.filter(
            (spell) => spell.level === currentSpellLevel
        ).length;
    }




    const setSpecialSkills = () => { 
        const newSpell = { name: "Osłona przed duchami", level: 1, school: "SPECJALNE SZAMAN", hex: "SPPR150", icon: "SPPR150.png", rememberCount: 6 };
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
    
        const newSpell2 = { name: "Skłębiona mgła", level: 2, school: "SPECJALNE SZAMAN", hex: "SPPR250", icon: "SPPR250.png", rememberCount: 6 };
        const spellHex2 = [
            ...Array.from(newSpell.hex).map((char) =>
            `0x${char.charCodeAt(0).toString(16).padStart(2, "0")}`
            ),
            "0x00",
            `0x${(newSpell.level - 1).toString(16).padStart(2, "0")}`,
            "0x00",
            "0x01",
            "0x00",
        ];
    
        const newSpell3 = { name: "Duchowa jasność umysłu", level: 3, school: "SPECJALNE SZAMAN", hex: "SPPR350", icon: "SPPR350.png", rememberCount: 4 };
        const spellHex3 = [
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
            clericSpells: [...prev.wizardSpells, newSpell, newSpell2, newSpell3],
        }));
    
        setExportData((prev) => ({
            ...prev,
            clericSpells: [...prev.wizardSpell, spellHex, spellHex2, spellHex3],
        }))
    }
    
    useEffect(() => {
        if(characterData.subclasses === "Szaman"){setSpecialSkills()}
    }, [characterData.subclasses])


    return(
        <>
            <div style={{ marginTop: "5px" }}><SorcererShamanSpellsHelpPopup/></div>
            <div className="d-flex flex-row">
                <div className="creation-background">
                    <div className="button-group" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                            <button className="standard-button" onClick={() => setCurrentSpellLevel(1)}>Poziom 1</button>
                            <button className="standard-button" onClick={() => setCurrentSpellLevel(2)}>Poziom 2</button>
                            <button className="standard-button" onClick={() => setCurrentSpellLevel(3)}>Poziom 3</button>
                    </div>
                    <span>
                        Wybrano zaklęcia: {selectedSpellsCount}/{spellLevelLimits[currentSpellLevel]}
                    </span>
                    <div className="d-flex flex-row" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                        <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                            {SorcererShamanSpellData
                                .filter((spell) => spell.level === currentSpellLevel)
                                .filter((spell) => !spell.school.includes("SPECJALNE"))
                                .map((spell, index) => (
                                    <div key={index} style={{ backgroundColor: "rgb(30, 30, 30)", border: "1px solid gray", margin: "10px", padding: "10px" }}>
                                        <SorcererAndShamanSpellRecord name={spell.name} level={spell.level} iconData={spell.iconFile} school={spell.school} hexData={spell.hexData} />
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="creation-background">
                    {(characterData.classes === "Szaman") ? (
                        characterData.clericSpells.map((spell, index) => (
                            <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                            <img 
                                src={characterData.classes === "Czarownik"
                                    ? `http://localhost:3000/WizardSpells/WizardSpellsIcons/${spell.icon}`
                                    : `http://localhost:3000/ClericSpells/ClericSpellsIcons/${spell.icon}`}
                                alt="Spell Icon"
                                style={{maxWidth: "50px", maxHeight: "50px"}}    
                            />
                            <span>{spell.name} Zapamiętanie:{spell.rememberCount}</span>
                        </div>
                        ))
                    ) : (
                        characterData.wizardSpells.map((spell, index) => (
                            <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                            <img 
                                src={characterData.classes === "Czarownik"
                                    ? `http://localhost:3000/WizardSpells/WizardSpellsIcons/${spell.icon}`
                                    : `http://localhost:3000/ClericSpells/ClericSpellsIcons/${spell.icon}`}
                                alt="Spell Icon"
                                style={{maxWidth: "50px", maxHeight: "50px"}}    
                            />
                            <span>{spell.name} Zapamiętanie:{spell.rememberCount}</span>
                        </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default SrocererAndShamanSpellsMenu;