import React, { useEffect, useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import StatControl from './AttributesControl';
import { CharacterAttributes } from '../types/CharacterData';
import AttributesHelpPopup from './popups/AttributesHelpPopup';


const strengtDescription = "Opisuję siłę mieśni bohatera, jego wytrzymałość i wytrwałość. Jest podstawową cechą zbrojnych\n\nSiła wpływa na:\n\nTHAC0\nZadawane obrażenia\nUmiejętność wyważania zamków\nMaksymalny udźwig"
const agilityDescription = "Opisuję zwinność, reflek, kordynacje i umiejętnośc zachowania równowagi. Jest podstawową cechą złodzieji.\n\nZręczność wpływa na:\n\nTHAC0 w walce dystansowej\nKlasę Pancerza (AC)\nWszelkie umiejętności złodziejskie"
const constitutionDescription = "Opisuję ogólną budowę bohatera, jego stan zdrowia i fizyczną wytrzymałość na obrażenia, choroby i inne rodzaju trudy. Ta cecha jest ważna dla łowców.\n\nKondycja wpływa na:\n\nBonus zdrowia na poziom bohatera\nPróg zmęczenia\nOdpornośc na upojenie alkocholowe\n(Tylko Krasnoludy/Gnomy/Niziołki) Bonus do rzutów obronnych"
const inteligenceDescription = "Opisuję zdolnośc rozumowania, zapamiętywania oraz uczenia się. Jest podstawową cechą magów.\n\n UWAGA: Postać o inteligencji mniejszej bądź równej 8 jest niepiśmienna i nie może kożystac ze zwojów oraz różdżek.\n\nInteligencja wpływa na:\nSzansę przepisania zwoju\nOkreśla maksymalny poziom zaklęcia dla magów\nOkreśla maksymalną ilośc znanych zaklęć dla magów\nWiedzę"
const wisdomDescription = "Opisuję intuicję, zdolność osądu, zdrowy rozsądek i siłe woli bohatera. Jest podstawową cechą kapłanów\n\nMądrość wpływa na:\n\nOkreśla maksymalny poziom zaklęcia dla kapłanów\nDodatkową ilość zapamiętanych zaklęć dla kapłanów\nWiedzę"
const charismaDescription = "Opisuję siłe przekonywania bohatera, jego urok osobisty i zdolności przywódcze. Jest to cecha istotna dla druidów, bardów i paladynów\n\nCharyzma wpływa na:\n\nZniżki u kupców\nPoczątkowe nastawienie NPC do bohatera"



const raceAttributeLimits: Record<string, Partial<Record<keyof CharacterAttributes, { min: number; max: number }>>> = {
  Człowiek: { strength: {min: 3, max: 18}, agility: {min: 3, max: 18}, constitution: {min: 3, max: 18}, intelligence: {min: 3, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 3, max: 18}},
  Elf: { strength: {min: 3, max: 18}, agility: {min: 7, max: 19}, constitution: {min: 6, max: 17}, intelligence: {min: 8, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 8, max: 18} },
  Pół_Elf: {strength: {min: 3, max: 18}, agility: {min: 6, max: 18}, constitution: {min: 6, max: 18}, intelligence: {min: 4, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 3, max: 18}},
  Krasnolud: { strength: {min: 8, max: 18}, agility: {min: 2, max: 17}, constitution: {min: 12, max: 19}, intelligence: {min: 3, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 1, max: 16} },
  Niziołek: {strength: {min: 6, max: 17}, agility: {min: 8, max: 19}, constitution: {min: 10, max: 18}, intelligence: {min: 6, max: 18}, wisdom: {min: 2, max: 17}, charisma: {min: 3, max: 18}},
  Gnom: { strength: {min: 6, max: 18}, agility: {min: 3, max: 18}, constitution: {min: 3, max: 18}, intelligence: {min: 3, max: 18}, wisdom: {min: 3, max: 18}, charisma: {min: 3, max: 18} },
  Pół_Ork: { strength: {min: 4, max: 19}, agility: {min: 3, max: 18}, constitution: {min: 4, max: 19}, intelligence: {min: 1, max: 16}, wisdom: {min: 3, max: 18}, charisma: {min: 3, max: 18} },
};

const classAttributeLimits: Record<string, Partial<Record<keyof CharacterAttributes, number>>> = {
  Wojownik: { strength: 9 },
  Łowca: { strength: 13, agility: 13, constitution: 14, wisdom: 14 },
  Paladyn: { strength: 12, constitution: 9, wisdom: 13, charisma: 17 },
  Kleryk: { wisdom: 9 },
  Druid: { wisdom: 12, charisma: 15 },
  Mag: { intelligence: 9 },

  Mistrz_Odrzucania: {intelligence: 9, wisdom: 15},
  Mistrz_Przywołań: {intelligence: 9, constitution: 15},
  Mistrz_Pozanania: {intelligence: 9, wisdom: 16},
  Mistrz_Zauroczeń: {intelligence: 9, charisma: 16},
  Iluzjonista: {intelligence: 9, agility: 16},
  Mistrz_Inwokacji: {intelligence: 9, constitution: 16},
  Nekromanta: {intelligence: 9, wisdom: 16},
  Mistrz_Przemian: {intelligence: 9, agility: 15},

  Łotrzyk: { agility: 9 },
  Bard: { agility: 12, intelligence: 13, charisma: 15 },
  Czarodziej: { intelligence: 9, charisma: 9 },
  Monk: { agility: 9, constitution: 9, wisdom: 9 },
  Szaman: { constitution: 12, wisdom: 12 },
};

const allowedClassesForModifier = ['Wojownik', 'Łowca', 'Paladyn'];

interface StrengthData {
  id: number;
  value: number;
  meleeThac0: number;
  dmgBonus: number;
  bashing: number;
  weight: number;
}
interface AgilityData {
  id: number;
  value: number;
  rangedThac0: number;
  ac: number;
  Kradziez_KieszonkowaBonus: number;
  Otwieranie_ZamkowBonus: number;
  Znajdywanie_PulapekBonus: number;
  Ciche_PoruszanieBonus: number;
  Krycie_W_CieniuBonus: number;
  Rozstawianie_PulapekBonus: number;
}
interface ConstitutionData {
  id: number;
  value: number;
  hpPerLevelBonus: number;
  intoxicationPerDrink: number;
  fatigue: number;
}
interface InteligneceData {
  id: number;
  value: number;
  INTmaxSpellLevel: number;
  INTspellPerLevel: number;
  scribeSuccessRate: number;
  INTlore: number;
}
interface WisdomData {
  id: number;
  value: number;
  extraSpellSlotlv1: number;
  extraSpellSlotlv2: number;
  extraSpellSlotlv3: number;
  extraSpellSlotlv4: number;
  WISlore: number;
}
interface CharismaData {
  id: number;
  value: number;
  reaction: number;
  buyDiscount: number;
}

const Stats: React.FC = () => {
  const { characterData, setCharacterData } = useCharacterContext();
  const [availablePoints, setAvailablePoints] = useState(0);
  const [totalRolledPoints, setTotalRolledPoints] = useState(0);
  const [strengthData, setStrengthData] = useState<StrengthData[]>([]);
  const [agilityData, setAgilityData] = useState<AgilityData[]>([]);
  const [constitutionData, setConstitutionData] = useState<ConstitutionData[]>([]);
  const [inteligenceData, setIntelignceData] = useState<InteligneceData[]>([]);
  const [wisdomData, setWisdomData] = useState<WisdomData[]>([]);
  const [charismaData, setCharismaData] = useState<CharismaData[]>([]);
  const [attributeDescription, setAttributeDescription] = useState<string>("Użyj przycisków +/- aby wyświetlić opis atrybuty");
  let meleeThaco0Exep = 0
  let dmgBonusExep = 0
  let bashingExep = 0
  let weightExep = 0

  const isModifierApplicable = (): boolean => {
    const selectedClass = characterData.classes;
    if (!selectedClass) return false;
    return allowedClassesForModifier.includes(selectedClass);
  };

  const getRaseLimit = (): Partial<Record<keyof CharacterAttributes, { min: number; max: number }>> => {
    const selectedRase = characterData.race
    if (!selectedRase) return {};
    return raceAttributeLimits[selectedRase] || {};
  }

  const getClassLimit = (): Partial<Record<keyof CharacterAttributes, number>> => {
    const selectedClass = characterData.classes
    if (!selectedClass) return {};

    const mageVariants = ["Mistrz_Odrzucania", "Mistrz_Przywołań", "Mistrz_Pozanania", "Mistrz_Zauroczeń", "Iluzjonista", "Mistrz_Inwokacji", "Nekromanta", "Mistrz_Przemian"];
    if (characterData.subclasses && mageVariants.includes(characterData.subclasses)) {
      return classAttributeLimits[characterData.subclasses] || {};
    }
    return classAttributeLimits[selectedClass] || {};
  }

  const getRandomValueInRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  
  const randomizeAttributes = () => {
    const raceLimits = getRaseLimit();
    const classLimits = getClassLimit();
  
    const newAttributes = (Object.keys(characterData.attributes) as (keyof CharacterAttributes)[]).reduce(
      (attrs, attr) => {
        const raceMin = raceLimits[attr]?.min ?? 1;
        const raceMax = raceLimits[attr]?.max ?? 18;
        const classMin = classLimits[attr] ?? 1;
  
        const finalMin = Math.max(raceMin, classMin);
        const finalMax = raceMax;
  
        attrs[attr] = getRandomValueInRange(finalMin, finalMax);
        return attrs;
      },
      {} as CharacterAttributes
    );

    const sumPoints = newAttributes.agility + newAttributes.charisma + newAttributes.constitution + newAttributes.intelligence + newAttributes.strength + newAttributes.wisdom

    if (isModifierApplicable()) {
      newAttributes.strengthModifier = getRandomValueInRange(0, 100);
    } else {
      newAttributes.strengthModifier = 0;
    }
  
    const updatedCharacterData = { ...characterData, attributes: newAttributes };
  
    // Oblicz bonusy na podstawie nowych wartości atrybutów
    
    if(newAttributes.strengthModifier <= 50){
      meleeThaco0Exep = 0
      dmgBonusExep = 1
      bashingExep = 5
      weightExep = 20
    }
    if(newAttributes.strengthModifier > 50 && newAttributes.strengthModifier <= 75){
      meleeThaco0Exep = -1
      dmgBonusExep = 1
      bashingExep = 10
      weightExep = 50
    }
    if(newAttributes.strengthModifier > 75 && newAttributes.strengthModifier <= 90){
      meleeThaco0Exep = 0
      dmgBonusExep = 2
      bashingExep = 15
      weightExep = 80
    }
    if(newAttributes.strengthModifier > 90 && newAttributes.strengthModifier <= 99){
      meleeThaco0Exep = -1
      dmgBonusExep = 3
      bashingExep = 20
      weightExep = 120
    }
    if(newAttributes.strengthModifier === 100){
      meleeThaco0Exep = -2
      dmgBonusExep = 4
      bashingExep = 25
      weightExep = 200
    }

    const strengthMatch = strengthData.find((item) => item.value === newAttributes.strength);
    if (strengthMatch) {
      if(isModifierApplicable() && newAttributes.strength === 18) {
        updatedCharacterData.melleThac0 = strengthMatch.meleeThac0 + meleeThaco0Exep
        updatedCharacterData.dmgBonus = strengthMatch.dmgBonus + dmgBonusExep
        updatedCharacterData.bashing = strengthMatch.bashing + bashingExep
        updatedCharacterData.weight = strengthMatch.weight + weightExep
      }
      else{
        updatedCharacterData.melleThac0 = strengthMatch.meleeThac0
        updatedCharacterData.dmgBonus = strengthMatch.dmgBonus
        updatedCharacterData.bashing = strengthMatch.bashing
        updatedCharacterData.weight = strengthMatch.weight
      }
    }

    const agilityMatch = agilityData.find((item) => item.value === newAttributes.agility);
    if (agilityMatch) {
      updatedCharacterData.rangedThac0 = agilityMatch.rangedThac0;
      updatedCharacterData.AC = agilityMatch.ac;
      updatedCharacterData.Otwieranie_ZamkówBonus = agilityMatch.Otwieranie_ZamkowBonus;
      updatedCharacterData.Kradzież_KieszonkowaBonus = agilityMatch.Kradziez_KieszonkowaBonus;
      updatedCharacterData.Ciche_PoruszanieBonus = agilityMatch.Ciche_PoruszanieBonus;
      updatedCharacterData.Krycie_W_CieniuBonus = agilityMatch.Krycie_W_CieniuBonus;
      updatedCharacterData.Znajdywanie_PułapekBonus = agilityMatch.Znajdywanie_PulapekBonus;
      updatedCharacterData.Rozstawianie_PułapekBonus = agilityMatch.Rozstawianie_PulapekBonus;
    }
  
    const constitutionMatch = constitutionData.find((item) => item.value === newAttributes.constitution);
    if (constitutionMatch) {
      updatedCharacterData.HPperLvBonus = constitutionMatch.hpPerLevelBonus;
      updatedCharacterData.IntoxicationPerDrink = constitutionMatch.intoxicationPerDrink;
      updatedCharacterData.fatigue = constitutionMatch.fatigue;
    }
  
    const inteligenceMatch = inteligenceData.find((item) => item.value === newAttributes.intelligence);
    if (inteligenceMatch) {
      updatedCharacterData.INTmaxSpellLevel = inteligenceMatch.INTmaxSpellLevel;
      updatedCharacterData.INTspellPerLevel = inteligenceMatch.INTspellPerLevel;
      updatedCharacterData.scribeSuccessRate = inteligenceMatch.scribeSuccessRate;
      updatedCharacterData.INTlore = inteligenceMatch.INTlore;
    }
  
    const wisdomMatch = wisdomData.find((item) => item.value === newAttributes.wisdom);
    if (wisdomMatch) {
      updatedCharacterData.extraSpellSlotlv1 = wisdomMatch.extraSpellSlotlv1;
      updatedCharacterData.extraSpellSlotlv2 = wisdomMatch.extraSpellSlotlv2;
      updatedCharacterData.extraSpellSlotlv3 = wisdomMatch.extraSpellSlotlv3;
      updatedCharacterData.extraSpellSlotlv4 = wisdomMatch.extraSpellSlotlv4;
      updatedCharacterData.WISlore = wisdomMatch.WISlore;
    }
  
    const charismaMatch = charismaData.find((item) => item.value === newAttributes.charisma);
    if (charismaMatch) {
      updatedCharacterData.reaction = charismaMatch.reaction;
      updatedCharacterData.buyDiscount = charismaMatch.buyDiscount;
    }
  
    // Zapisz nowe dane postaci zaktualizowanymi bonusami
    setCharacterData(updatedCharacterData);
    setTotalRolledPoints(sumPoints)
  };
  

  useEffect(() => {
    const fetchStrength = async () => {
      try {
        const response = await fetch("http://localhost:3000/strength");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStrengthData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchAgility = async () => {
      try {
        const response = await fetch("http://localhost:3000/agility");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAgilityData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchConstitution = async () => {
      try {
        const response = await fetch("http://localhost:3000/constitution");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConstitutionData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchInteligence = async () => {
      try {
        const response = await fetch("http://localhost:3000/inteligence");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setIntelignceData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchWisdom = async () => {
      try {
        const response = await fetch("http://localhost:3000/wisdom");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWisdomData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    const fetchCharisma = async () => {
      try {
        const response = await fetch("http://localhost:3000/charisma");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharismaData(data);
      } catch (error) {
        console.error("Error fetching strength data:", error);
      }
    };

    fetchStrength();
    fetchAgility();
    fetchConstitution();
    fetchInteligence();
    fetchWisdom();
    fetchCharisma();

  }, []);

  useEffect(() => {
    const strengthMatch = strengthData.find((item) => item.value === characterData.attributes.strength);
    if (strengthMatch) {
      if(isModifierApplicable() && characterData.attributes.strength === 18) {
        characterData.melleThac0 = strengthMatch.meleeThac0 + meleeThaco0Exep
        characterData.dmgBonus = strengthMatch.dmgBonus + dmgBonusExep
        characterData.bashing = strengthMatch.bashing + bashingExep
        characterData.weight = strengthMatch.weight + weightExep
      }
      else{
        characterData.melleThac0 = strengthMatch.meleeThac0
        characterData.dmgBonus = strengthMatch.dmgBonus
        characterData.bashing = strengthMatch.bashing
        characterData.weight = strengthMatch.weight
      }
    }
    const agilityhMatch = agilityData.find((item) => item.value === characterData.attributes.agility);
    if (agilityhMatch) {
      characterData.rangedThac0 = agilityhMatch.rangedThac0,
      characterData.AC = agilityhMatch.ac,
      characterData.Otwieranie_ZamkówBonus = agilityhMatch.Otwieranie_ZamkowBonus,
      characterData.Kradzież_KieszonkowaBonus = agilityhMatch.Kradziez_KieszonkowaBonus,
      characterData.Ciche_PoruszanieBonus = agilityhMatch.Ciche_PoruszanieBonus,
      characterData.Krycie_W_CieniuBonus = agilityhMatch.Krycie_W_CieniuBonus,
      characterData.Znajdywanie_PułapekBonus = agilityhMatch.Znajdywanie_PulapekBonus,
      characterData.Rozstawianie_PułapekBonus = agilityhMatch.Rozstawianie_PulapekBonus
    }
    const constitutionMatch = constitutionData.find((item) => item.value === characterData.attributes.constitution);
    if (constitutionMatch) {
      characterData.HPperLvBonus = constitutionMatch.hpPerLevelBonus,
      characterData.IntoxicationPerDrink = constitutionMatch.intoxicationPerDrink,
      characterData.fatigue = constitutionMatch.fatigue
    }
    const inteligenceMatch = inteligenceData.find((item) => item.value === characterData.attributes.intelligence);
    if (inteligenceMatch) {
      characterData.INTmaxSpellLevel = inteligenceMatch.INTmaxSpellLevel,
      characterData.INTspellPerLevel = inteligenceMatch.INTspellPerLevel,
      characterData.scribeSuccessRate = inteligenceMatch.scribeSuccessRate,
      characterData.INTlore = inteligenceMatch.INTlore
    }
    const wisdomMatch = wisdomData.find((item) => item.value === characterData.attributes.wisdom);
    if (wisdomMatch) {
      characterData.extraSpellSlotlv1 = wisdomMatch.extraSpellSlotlv1,
      characterData.extraSpellSlotlv2 = wisdomMatch.extraSpellSlotlv2,
      characterData.extraSpellSlotlv3 = wisdomMatch.extraSpellSlotlv3,
      characterData.extraSpellSlotlv4 = wisdomMatch.extraSpellSlotlv4,
      characterData.WISlore = wisdomMatch.WISlore
    }
    const charismaMatch = charismaData.find((item) => item.value === characterData.attributes.charisma);
    if (charismaMatch) {
      characterData.reaction = charismaMatch.reaction,
      characterData.buyDiscount = charismaMatch.buyDiscount
    }
  }, [characterData.attributes]);

  

  const updateAttribute = (attribute: keyof CharacterAttributes, delta: number) => {
    if(attribute == "strength") {setAttributeDescription(strengtDescription)}
    if(attribute == "agility") {setAttributeDescription(agilityDescription)}
    if(attribute == "constitution") {setAttributeDescription(constitutionDescription)}
    if(attribute == "intelligence") {setAttributeDescription(inteligenceDescription)}
    if(attribute == "wisdom") {setAttributeDescription(wisdomDescription)}
    if(attribute == "charisma") {setAttributeDescription(charismaDescription)}

    setCharacterData((prevData) => {
      const currentAttributeValue = prevData.attributes[attribute];

      const raceLimits = getRaseLimit();
      const classLimits = getClassLimit();

      const raceMin = raceLimits[attribute]?.min ?? 1;
      const raceMax = raceLimits[attribute]?.max ?? 18;
      const classMin = classLimits[attribute] ?? 1;

      const finalMin = Math.max(raceMin, classMin);
      const finalMax = raceMax;

      const newValue = currentAttributeValue + delta;

       if(delta > 0 && newValue <= finalMax && availablePoints <= 0)
       {
         delta = 0;
         return prevData
       }

      if (newValue < finalMin || newValue > finalMax) {
        delta = 0;
        return prevData;
      }
  
      const updatedAttributes = {
        ...prevData.attributes,
        [attribute]: newValue,

      };

      return {
        ...prevData,
        attributes: updatedAttributes,
        
      };
    });

    setAvailablePoints((prev) => {
      const currentAttributeValue = characterData.attributes[attribute];

      const raceLimits = getRaseLimit();
      const classLimits = getClassLimit();

      const raceMin = raceLimits[attribute]?.min ?? 1;
      const raceMax = raceLimits[attribute]?.max ?? 18;
      const classMin = classLimits[attribute] ?? 1;

      const finalMin = Math.max(raceMin, classMin);
      const finalMax = raceMax;
      
      if (delta == 0) {
        return prev;
      }

      if (delta > 0 && currentAttributeValue + delta <= finalMax) {
        return prev - 1;
      }
  
      if (delta < 0 && currentAttributeValue + delta >= finalMin) {
        return prev + 1; 
      }
  
      return prev;
    });
  };

  useEffect(() => {
    randomizeAttributes();
  },[]);

  return (
    <>
      <div className='d-flex flex-row'>
        <div style={{ marginTop: "5px" }}><AttributesHelpPopup/></div>
        <div className="creation-background" style={{ backgroundColor: "rgb(30, 30, 30)" }}>
          <button onClick={randomizeAttributes} className="standard-button">
            Powtórz rzut
          </button> 
          <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)" }}>
            <p className="secondary-text" style={{fontSize: "1.55rem", margin: "7px"}}>Punkty do wydania: {availablePoints}</p>
            <p className="secondary-text" style={{fontSize: "1.55rem", margin: "7px"}}>Suma Wylosowanych Punktów: {totalRolledPoints}</p>
          </div>

            <div style={{ backgroundColor: "rgb(30, 30, 30)" }}>
              <StatControl
                statName={
                  characterData.attributes.strength === 18 && isModifierApplicable()
                    ? `Siła ${characterData.attributes.strength}/${characterData.attributes.strengthModifier}`
                    : 'Siła'
                }
                statValue={characterData.attributes.strength}
                onIncrement={() => {updateAttribute('strength', 1);}}
                onDecrement={() => {updateAttribute('strength', -1);}}
              />

              <StatControl
                statName="Zręczność"
                statValue={characterData.attributes.agility}
                onIncrement={() => updateAttribute('agility', 1)}
                onDecrement={() => updateAttribute('agility', -1)}
              />

              <StatControl
                statName="Kondycja"
                statValue={characterData.attributes.constitution}
                onIncrement={() => updateAttribute('constitution', 1)}
                onDecrement={() => updateAttribute('constitution', -1)}
              />

              <StatControl
                statName="Inteligencja"
                statValue={characterData.attributes.intelligence}
                onIncrement={() => updateAttribute('intelligence', 1)}
                onDecrement={() => updateAttribute('intelligence', -1)}
              />

              <StatControl
                statName="Mądrość"
                statValue={characterData.attributes.wisdom}
                onIncrement={() => updateAttribute('wisdom', 1)}
                onDecrement={() => updateAttribute('wisdom', -1)}
              />
      

              <StatControl
                statName="Charyzma"
                statValue={characterData.attributes.charisma}
                onIncrement={() => updateAttribute('charisma', 1)}
                onDecrement={() => updateAttribute('charisma', -1)}
              />
          </div>
        </div>

        <div className="creation-background"  style={{ backgroundColor: "rgb(30, 30, 30)" }}>
          <span style={{ whiteSpace: "pre-wrap" }}>{attributeDescription}</span>
        </div>
      </div>


      <div className='attributes-background' style={{ backgroundColor: "rgb(30, 30, 30)" }}>
        {/* STRENGTH */}
        <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)" }}>
            <p className="attributes-description-text">|+ THAC0: <strong>{characterData.melleThac0}</strong>|</p>
            <p className="attributes-description-text">|+ Obrażenia: <strong>{characterData.dmgBonus}</strong>|</p>
            <p className="attributes-description-text">|Wyważanie zamków: <strong>{characterData.bashing}</strong>|</p>
            <p className="attributes-description-text">|Udźwig: <strong>{characterData.weight}</strong>|</p>
        </div>

        {/* DEXTERITY */}
        <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)" }}>
        <p className="attributes-description-text">|+ THAC0(dystansowe): <strong>{characterData.rangedThac0}</strong>|</p>
            <p className="attributes-description-text">|+ AC: <strong>{characterData.AC}</strong>|</p>
            <p className="attributes-description-text">|+ Kradzieży kieszonkowej: <strong>{characterData.Kradzież_KieszonkowaBonus}</strong>|</p>
            <p className="attributes-description-text">|+ Otwierania zamków: <strong>{characterData.Otwieranie_ZamkówBonus}</strong>|</p>
            <p className="attributes-description-text">|+ Znajdywania pułapek: <strong>{characterData.Znajdywanie_PułapekBonus}</strong>|</p>
            <p className="attributes-description-text">|+ Cichego poruszania: <strong>{characterData.Ciche_PoruszanieBonus}</strong>|</p>
            <p className="attributes-description-text">|+ Krycia w cieniu: <strong>{characterData.Krycie_W_CieniuBonus}</strong>|</p>
            <p className="attributes-description-text">|+ Rozstawiania pułapek: <strong>{characterData.Rozstawianie_PułapekBonus}</strong>|</p>
        </div>

        {/* CONSTITUTION */}
        <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)" }}>
          <p className="attributes-description-text">|+ Zdrowie na poziom: <strong>{characterData.HPperLvBonus}</strong>|</p>
            <p className="attributes-description-text">|Mocna głowa: <strong>{characterData.IntoxicationPerDrink}</strong>|</p>
            <p className="attributes-description-text">|Próg zmęczenia: <strong>{characterData.fatigue}</strong>|</p>
        </div>

        {/* INTELIGENCE */}
        <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)" }}>
            <p className="attributes-description-text">|Max poziom zaklęć maga: <strong>{characterData.INTmaxSpellLevel}</strong>|</p>
            <p className="attributes-description-text">|Max zaklęć maga na poziom: <strong>{characterData.INTspellPerLevel}</strong>|</p>
            <p className="attributes-description-text">|Szansa przepisania zwoju: <strong>{characterData.scribeSuccessRate}</strong>|</p>
            <p className="attributes-description-text">|+ Wiedza: <strong>{characterData.INTlore}</strong>|</p>
        </div>

        {/* WISDOM */}
        <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)" }}>
          <p className="attributes-description-text">|+ Zaklęć kleryka poziomu 1: <strong>{characterData.extraSpellSlotlv1}</strong>|</p>
          <p className="attributes-description-text">|+ Zaklęć kleryka poziomu 2: <strong>{characterData.extraSpellSlotlv2}</strong>|</p>
          <p className="attributes-description-text">|+ Zaklęć kleryka poziomu 3: <strong>{characterData.extraSpellSlotlv3}</strong>|</p>
          <p className="attributes-description-text">|+ Zaklęć kleryka poziomu 4: <strong>{characterData.extraSpellSlotlv4}</strong>|</p>
          <p className="attributes-description-text">|+ Wiedza: <strong>{characterData.WISlore}</strong>|</p>
        </div>

        {/* CHARISMA */}
        <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)" }}>
          <p className="attributes-description-text">|+ Reakcja NPC: <strong>{characterData.reaction}</strong>|</p>
          <p  className="attributes-description-text">|Zniżka w sklepach: <strong>{characterData.buyDiscount}%</strong>|</p>
        </div>
      </div>
    </>
  );
};

export default Stats;
