import React, { useEffect, useState } from "react";
import { useCharacterContext, defaultThievingAbilities } from "../context/CharacterContext";
import { ThievingAbilities, WeaponProficiencys } from "../types/CharacterData";
import { useExportDataContext } from "../context/ExportDataContext";
import WizardSpellRecord from "./WizardSpellRecord";
import ProficiencysMenu from "./ProficiencysMenu";
import ThievingAbilitiesMenu from "./ThievingAbilitiesMenu";
import RacialEnemyMenu from "./RacialEnemyMenu";
import WizardSpellsMenu from "./WizardSpellsMenu";
import ClericSpellsMenu from "./ClericSpellsMenu";

const racialEnemyData = {
  Obserwator: "0x123",
  DemonyUpadli: "0x121",
  Smok: "0x146",
  Żywiołak: "0x145",
  Ettercap: "0x107",
  IstotyBaśniowe: "0x120",
  Geniusz: "0x147",
  Ghul: "0x108",
  Golem: "0x144",
  Hobgoblin: "0x111",
  Chochlik: "0x109",
  Koblod: "0x112",
  KuoToa: "0x135",
  Lisz: "0x150",
  Likantrop: "0x122",
  Mefit: "0x139",
  ŁupieżcaUmysłu: "0x124",
  Ogr: "0x113",
  Otaig: "0x127",
  Rakshasa: "0x128",
  Sahuagin: "0x131",
  Cień: "0x132",
  Szlam: "0x119",
  Pająk: "0x116",
  Trol: "0x129",
  UmbrowyKolos: "0x130",
  Wampir: "0x125",
  Ork: "0x143",
}

const raseBonusThievingAbilities: Record<string, { skillsThief: Partial<ThievingAbilities>}> = {
  Człowiek : {
    skillsThief: {
      Otwieranie_Zamkow: 10,
      Kradziez_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pulapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
  Krasonlud : {
    skillsThief: {
      Otwieranie_Zamkow: 20,
      Kradziez_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pulapek: 20,
      Wykrywanie_Iluzji: 5,
      Rozstawianie_Pulapek: 10,
    }
  },
  Elf : {
    skillsThief: {
      Otwieranie_Zamkow: 5,
      Kradziez_Kieszonkowa: 20,
      Ciche_Poruszanie: 15,
      Krycie_W_Cieniu: 15,
      Znajdywanie_Pulapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
  Gnom : {
    skillsThief: {
      Otwieranie_Zamkow: 15,
      Kradziez_Kieszonkowa: 15,
      Ciche_Poruszanie: 15,
      Krycie_W_Cieniu: 10,
      Znajdywanie_Pulapek: 15,
      Wykrywanie_Iluzji: 10,
      Rozstawianie_Pulapek: 5,
    }
  },
  Pół_Elf : {
    skillsThief: {
      Otwieranie_Zamkow: 10,
      Kradziez_Kieszonkowa: 25,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 10,
      Znajdywanie_Pulapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
  Pół_Ork : {
    skillsThief: {
      Otwieranie_Zamkow: 10,
      Kradziez_Kieszonkowa: 15,
      Ciche_Poruszanie: 10,
      Krycie_W_Cieniu: 5,
      Znajdywanie_Pulapek: 5,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
  Niziołek : {
    skillsThief: {
      Otwieranie_Zamkow: 15,
      Kradziez_Kieszonkowa: 20,
      Ciche_Poruszanie: 20,
      Krycie_W_Cieniu: 20,
      Znajdywanie_Pulapek: 10,
      Wykrywanie_Iluzji: 0,
      Rozstawianie_Pulapek: 0,
    }
  },
}

interface WizardSpell {
  id: number;
  name: string;
  school: string;
  level: number;
  descriptionFile: string;
  iconFile: string;
  hexData: string;
}

type Category = 'proficiencys' | 'thievingSKills' | 'racialEnemy' | 'wizardSpells' | 'clericSpells';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('proficiencys');
  const { characterData, setCharacterData } = useCharacterContext();
  const { exportData, setExportData } = useExportDataContext();
  const selectedSubclass = characterData.subclasses;
  const selectedRace = characterData.race;

  const [backendProficiencys, setBackendProficiencys] = useState<any>({});
  const [backednThievingAbilities, setBackendThievingAbilities] = useState<any>({});
  const [proficiencysPoints, setProficiencysPoints] = useState(0);
  const [ThievingAbilitiesPoints, setThievingAbilitiesPoints] = useState(0);
  const [WizardSpellsData, setWizardSpells] = useState<WizardSpell[]>([]);



  useEffect(() => {
    const fetchAndInitializeData = async () => {
      try {
        const proficiencysResponse = await fetch("http://localhost:3000/proficiencystosubclassdata");
        if (!proficiencysResponse.ok) {
          throw new Error(`HTTP error! status: ${proficiencysResponse.status}`);
        }
        const proficiencysData = await proficiencysResponse.json();
        const selectedProficiencys = proficiencysData.find(
          (data: { subclass: string | undefined }) => data.subclass === selectedSubclass
        );
  
        const thievingResponse = await fetch("http://localhost:3000/thievingabilitiestosubclassdata");
        if (!thievingResponse.ok) {
          throw new Error(`HTTP error! status: ${thievingResponse.status}`);
        }
        const thievingData = await thievingResponse.json();
        const selectedThievingAbilities = thievingData.find(
          (data: { subclass: string | undefined }) => data.subclass === selectedSubclass
        );

        const wizardRespone = await fetch("http://localhost:3000/wizardSpellData");
        if (!wizardRespone.ok) {
          throw new Error(`HTTP error! status: ${wizardRespone.status}`);
        }
        const wizardSpells = await wizardRespone.json();
  
        setBackendProficiencys(selectedProficiencys || {});
        setBackendThievingAbilities(selectedThievingAbilities || {});
        setWizardSpells(wizardSpells || {});
  
        const updatedSkills = { ...characterData.skills };
        const updatedThievingSkills = { ...characterData.skillsThief };
        
  
        if (selectedProficiencys) {
          Object.keys(selectedProficiencys).forEach((key) => {
            if (key !== "skillPoints" && key !== "subclass" && key !== "id") {
              const maxLevel = selectedProficiencys[key];
              if (maxLevel !== -1) {
                updatedSkills[key as keyof WeaponProficiencys] = 0;
              }
            }
          });
        }

        if (selectedThievingAbilities) {
          Object.keys(selectedThievingAbilities).forEach((key) => {
            if (key !== "skillPointsThief" && key !== "subclass" && key !== "id") {
              const minLevel = selectedThievingAbilities[key];
              if (minLevel !== -1) {
                updatedThievingSkills[key as keyof ThievingAbilities] = minLevel;
              }
            }
          });
        }
  
        setCharacterData((prev) => ({
          ...prev,
          skills: updatedSkills,
          skillsThief: updatedThievingSkills
        }));

        setProficiencysPoints(selectedProficiencys.skillPoints || 0)
        setThievingAbilitiesPoints(selectedThievingAbilities.skillPointsThief || 0)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchAndInitializeData();
  }, [selectedSubclass]);


  const renderContent = () => {
    switch (activeCategory) {
      case 'proficiencys':
        return <ProficiencysMenu />;
      case 'thievingSKills':
        return <ThievingAbilitiesMenu />;
      case 'racialEnemy':
        return <RacialEnemyMenu />;
      case 'wizardSpells':
        return <WizardSpellsMenu />;
      case 'clericSpells':
        return <ClericSpellsMenu />;
      default:
        return null;
    }
  };

  return (
    <>
      <h2 className="secondary-text">Wybierz Biegłości</h2>
      <div className="button-group">
        <button className="standard-button" onClick={() => setActiveCategory('proficiencys')}>
          Biegłości
        </button>

        <button
          className="standard-button"
          onClick={() => ['Złodziej', 'Łowca', 'Szaman', 'Bard', 'Mnich'].includes(characterData.classes) && setActiveCategory('thievingSKills')}
          disabled={!['Złodziej', 'Łowca', 'Szaman', 'Bard', 'Mnich'].includes(characterData.classes)}
        >
          Umiejętności Złodziejskie
        </button>

        <button
          className="standard-button"
          onClick={() => ['Mag', 'Czarownik', 'Bard'].includes(characterData.classes) && setActiveCategory('wizardSpells')}
          disabled={!['Mag', 'Czarownik', 'Bard'].includes(characterData.classes)}
        >
          Zaklęcia Maga
        </button>

        <button
          className="standard-button"
          onClick={() => ['Kapłan', 'Druid', 'Szaman'].includes(characterData.classes) && setActiveCategory('clericSpells')}
          disabled={!['Kapłan', 'Druid', 'Szaman'].includes(characterData.classes)}
        >
          Zaklęcia Kleryka
        </button>

        <button
          className="standard-button"
          onClick={() => ['Łowca'].includes(characterData.classes) && setActiveCategory('racialEnemy')}
          disabled={!['Łowca'].includes(characterData.classes)}
        >
          Wróg Rasowy
        </button>
      </div>

      <div className='m-5'>{renderContent()}</div>
    </>
  )
}

export default Skills;