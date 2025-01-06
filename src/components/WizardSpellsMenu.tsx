import React, { useEffect, useState } from "react";
import { useExportDataContext } from "../context/ExportDataContext";
import { useCharacterContext } from "../context/CharacterContext";
import WizardSpellRecord from "./WizardSpellRecord";
import RememberWizardSpellRecord from "./RememberWizardSpellRecod";

interface WizardSpellBackedn {
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
    Ilizjonista: "Nekromancja",
    Mistrz_Inwokacji: "Zaczarowania",
    Nekromanta: "Iluzje",
    Mistrz_Przemian: "Odrzucanie",
}

const spellRequirement = {
    Mistrz_Odrzucania: "Odrzucanie",
    Mistrz_Przywołań: "Przywoływanie",
    Mistrz_Pozanania: "Poznanie",
    Mistrz_Zauroczeń: "Zaczarowania",
    Ilizjonista: "Iluzje",
    Mistrz_Inwokacji: "Inwokacje",
    Nekromanta: "Nekromancja",
    Mistrz_Przemian: "Przemiany",
}
  

const WizardSpellsMenu: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();
    const { exportData, setExportData } = useExportDataContext();
    const selectedSubclass = characterData.subclasses;

    const [currentSpellLevel, setCurrentSpellLevel] = useState(1);
    const [WizardSpellsData, setWizardSpells] = useState<WizardSpellBackedn[]>([]);
        
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

    useEffect(() => {
        hasRequiredSpell()
    }, [characterData.wizardSpells])


    return(
        <>
            <div className="buttonGroup">
                    <button className="primaryButton" onClick={() => setCurrentSpellLevel(1)}>Poziom 1</button>
                    <button className="primaryButton" onClick={() => setCurrentSpellLevel(2)}>Poziom 2</button>
                    <button className="primaryButton" onClick={() => setCurrentSpellLevel(3)}>Poziom 3</button>
                    <button className="primaryButton" onClick={() => setCurrentSpellLevel(4)}>Poziom 4</button>
            </div>
            <p>
                Wybrano zaklęcia: {selectedSpellsCount}/{spellLevelLimits[currentSpellLevel]}
            </p>
            <div className="flex flex-row">
                <div className="proficiencysBackground">
                {!hasRequiredSpell() && (
                    <p style={{ color: "red" }}>
                        Musisz wybrać przynajmniej jedno zaklęcie z wymaganej szkoły magii!
                    </p>
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
                <div>
                {characterData.wizardSpells
                    .filter((spell) => spell.level === currentSpellLevel)
                    .map((spell, index) => (
                        <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                            <RememberWizardSpellRecord name={spell.name} level={spell.level} iconData={spell.icon} rememberCount={spell.rememberCount} />
                        </div>
                ))}
                </div>
            </div>


        </>
    )
}

export default WizardSpellsMenu;