import React, { useEffect, useState } from "react";
import { useExportDataContext } from "../context/ExportDataContext";
import { useCharacterContext } from "../context/CharacterContext";
import WizardSpellRecord from "./WizardSpellRecord";
import RememberWizardSpellRecord from "./RememberWizardSpellRecod";

interface WizardSpell {
    id: number;
    name: string;
    school: string;
    level: number;
    descriptionFile: string;
    iconFile: string;
    hexData: string;
}

const WizardSpellsMenu: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();
    const { exportData, setExportData } = useExportDataContext();
    const selectedSubclass = characterData.subclasses;

    const [currentSpellLevel, setCurrentSpellLevel] = useState(1);
    const [WizardSpellsData, setWizardSpells] = useState<WizardSpell[]>([]);
        
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
                    {WizardSpellsData
                    .filter((spell) => spell.level === currentSpellLevel)
                    .map((spell, index) => (
                        <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                            <WizardSpellRecord name={spell.name} school={spell.school} level={spell.level} iconData={spell.iconFile} hexData={spell.hexData} />
                        </div>
                    ))}
                </div>
                <div>
                {characterData.wizardSpells
                    .filter((spell) => spell.level === currentSpellLevel)
                    .map((spell, index) => (
                        <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                            <RememberWizardSpellRecord name={spell.name} iconData={spell.icon} />
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}

export default WizardSpellsMenu;