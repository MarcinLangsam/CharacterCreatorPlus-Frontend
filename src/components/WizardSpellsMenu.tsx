import React, { useEffect, useState } from "react";
import { useExportDataContext } from "../context/ExportDataContext";
import { useCharacterContext } from "../context/CharacterContext";
import WizardSpellRecord from "./WizardSpellRecord";
import RememberWizardSpellRecord from "./RememberWizardSpellRecod";
import WizardSpellsHelpPopup from "./popups/WizardSpellsHelpPopup";

interface WizardSpellBackend {
    id: number;
    name: string;
    school: string;
    level: number;
    descriptionFile: string;
    iconFile: string;
    hexData: string;
}

const spellRestriction = {
    Mistrz_Odrzucania: "Przemiany",
    Mistrz_Przywołań: "Poznanie",
    Mistrz_Pozanania: "Sprowadzanie",
    Mistrz_Zauroczeń: "Inwokacje",
    Iluzjonista: "Nekromancja",
    Mistrz_Inwokacji: "Zaczarowania",
    Nekromanta: "Iluzje",
    Mistrz_Przemian: "Odrzucanie",
}

const spellRequirement = {
    Mistrz_Odrzucania: "Odrzucanie",
    Mistrz_Przywołań: "Przywoływanie",
    Mistrz_Pozanania: "Poznanie",
    Mistrz_Zauroczeń: "Zaczarowania",
    Iluzjonista: "Iluzje",
    Mistrz_Inwokacji: "Inwokacje",
    Nekromanta: "Nekromancja",
    Mistrz_Przemian: "Przemiany",
}
  

const WizardSpellsMenu: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();
    const { exportData, setExportData } = useExportDataContext();
    const selectedSubclass = characterData.subclasses;

    const [currentSpellLevel, setCurrentSpellLevel] = useState(1);
    const [WizardSpellsData, setWizardSpells] = useState<WizardSpellBackend[]>([]);
        
    useEffect(() => {    
        const fetchAndInitializeData = async () => {
            try {
            
            const wizardRespone = await fetch("http://localhost:3000/wizardSpellData");
            if (!wizardRespone.ok) {
                throw new Error(`HTTP error! status: ${wizardRespone.status}`);
            }
            const wizardSpells = await wizardRespone.json();
        
            setWizardSpells(wizardSpells || {});
        
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
        
        fetchAndInitializeData();
    }, [selectedSubclass]);

    const spellRememberLimits: Record<number, number> = {
        1: 4,
        2: 3,
        3: 2,
        4: 1,
      };

    const spellLevelLimits: { [key: number]: number } = {
        1: 5,
        2: 4,
        3: 3,
        4: 2,
    };
      
    const selectedSpellsCount = characterData.wizardSpells.filter(
        (spell) => spell.level === currentSpellLevel
    ).length;

    const hasRequiredSpell = () => {
        const requiredSchool = spellRequirement[characterData.subclasses as keyof typeof spellRequirement];
        if (!requiredSchool) return true;
    
        const spellsByLevel = WizardSpellsData.reduce<Record<number, typeof WizardSpellsData>>((acc, spell) => {
            if (spell.school === requiredSchool) {
            if (!acc[spell.level]) {
                acc[spell.level] = [];
            }
            acc[spell.level].push(spell);
            }
            return acc;
        }, {});
    
        return Object.keys(spellsByLevel).every((level) => {
        return characterData.wizardSpells.some(
            (spell) => spell.level === parseInt(level, 10) && spell.school === requiredSchool
        );
        });
    };

    const setSpecialSkills = () => { 
        const newSpell = { name: "Piruet Ofensywny", level: 0, school: "SPECJALNE", hex: "SPCL521", icon: "SPCL521.png", rememberCount: 1 };
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

        const newSpell2 = { name: "Piruet Defensywny", level: 0, school: "SPECJALNE", hex: "SPCL522", icon: "SPCL522.png", rememberCount: 1 };
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
    
        setCharacterData((prev) => ({
            ...prev,
            wizardSpells: [...prev.wizardSpells, newSpell, newSpell2],
        }));
    
        setExportData((prev) => ({
            ...prev,
            wizardSpell: [...prev.wizardSpell, spellHex, spellHex2]
        }))
    }

    useEffect(() => {
        hasRequiredSpell()
    }, [characterData.wizardSpells])

    useEffect(() => {
        if(characterData.subclasses === "Fechmistrz"){setSpecialSkills()}
    }, [characterData.subclasses])


    return(
        <>
            <div style={{ marginTop: "5px" }}><WizardSpellsHelpPopup/></div>
            <div className="d-flex flex-row">
                <div className="creation-background">
                    <div className="button-group" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                            <button className="standard-button" onClick={() => setCurrentSpellLevel(1)}>Poziom 1</button>
                            <button className="standard-button" onClick={() => setCurrentSpellLevel(2)}>Poziom 2</button>
                            <button className="standard-button" onClick={() => setCurrentSpellLevel(3)}>Poziom 3</button>
                            <button className="standard-button" onClick={() => setCurrentSpellLevel(4)}>Poziom 4</button>
                    </div>
                    <span>
                        Wybrano zaklęcia: {selectedSpellsCount}/{spellLevelLimits[currentSpellLevel]}
                    </span>
                    <div className="d-flex flex-row" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                        <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                        {!hasRequiredSpell() && (
                            <span style={{ color: "red" }}>
                                Musisz wybrać przynajmniej jedno zaklęcie z wymaganej szkoły magii!
                            </span>
                            )}
                            {WizardSpellsData.filter((spell) => {
                            const restrictedSchool = spellRestriction[characterData.subclasses as keyof typeof spellRestriction];
                            if (!restrictedSchool) return true;
                            return spell.school !== restrictedSchool;
                            })
                            .filter((spell) => spell.level === currentSpellLevel)
                            .map((spell, index) => {
                            const requiredSchool = spellRequirement[characterData.subclasses as keyof typeof spellRequirement];
                            const isRequiredSpell = spell.school === requiredSchool;

                            return (
                                <div
                                key={index}
                                style={{
                                    border: isRequiredSpell ? "2px solid green" : "1px solid gray",
                                    margin: "10px",
                                    padding: "10px",
                                    backgroundColor: "rgb(30, 30, 30)"
                                }}
                                >
                                <WizardSpellRecord
                                    name={spell.name}
                                    school={spell.school}
                                    level={spell.level}
                                    iconData={spell.iconFile}
                                    hexData={spell.hexData}
                                />
                                </div>
                            );
                            })}
                        </div>
                    </div>
                </div>

                <div className="creation-background">
                    <span>
                        Możesz zapamiętać {spellRememberLimits[currentSpellLevel]} zaklęcia poziomu {currentSpellLevel}
                    </span>
                    {characterData.wizardSpells
                        .filter((spell) => spell.level === currentSpellLevel)
                        .map((spell, index) => (
                            <div key={index} style={{ backgroundColor: "rgb(30, 30, 30)", border: "1px solid gray", margin: "10px", padding: "10px" }}>
                                <RememberWizardSpellRecord name={spell.name} level={spell.level} iconData={spell.icon} rememberCount={spell.rememberCount} />
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default WizardSpellsMenu;