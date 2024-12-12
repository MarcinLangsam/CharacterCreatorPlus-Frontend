import React, { useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';
import { SubclassesExport, ThievingAbilitiesExport, WeaponProficiencysExport } from '../types/ExportData';


const thievingAbilitiesExport: ThievingAbilitiesExport = {
  Otwieranie_Zamkow: 0xCB,
  Kradziez_Kieszonkowa: 0xCE,
  Ciche_Poruszanie: 0xCC,
  Krycie_W_Cieniu: 0xA9,
  Znajdywanie_Pulapek: 0xCD,
  Wykrywanie_Iluzji: 0xC8,
  Rozstawianie_Pulapek: 0xC9,
}

const weaponProficiencysExport: WeaponProficiencysExport = {
  MieczePoltorareczne: 0x59, //89
  MieczeDlugie: 0x5A,
  MieczeKrotkie: 0x5B,
  Topory: 0x5C,
  MieczeObureczne: 0x5D,
  Katany: 0x5E,
  SejmitarWakizashiNinjaTo: 0x5F,
  Sztylety: 0x5F,
  MlotyBojowe: 0x60,
  Maczugi: 0x61,
  Wlocznie: 0x62,
  Halabarda: 0x63,
  CepyBojoweMorgernszterny: 0x64,
  Wiekiery: 0x65,
  Kije: 0x66,
  Kusze: 0x67,
  DlugieLuki: 0x68,
  KrotkieLuki: 0x69,
  Strzalki: 0x6A,
  Proce: 0x6B, //107
  StylWalkiBroniaDwureczna: 0x6F, //111
  StylWalkiMieczemITarcza: 0x70, //112
  StylWalkiJednaBronia: 0x71, //113
  StylWalkiDwiemaBronmi: 0x72, //114
}

const subclassesExport: SubclassesExport = {
  Wojownik: "Woj",
  Berserker: "Ber",
  Zabójca_Magów: "Zab",
  Kensai: "Ken",
  Krasnoludzki_Obrońca: "Kra",
  Barbarzyńca: "Bar",
  Łowca: "Low",
  Łucznik: "Luc",
  Tropiciel: "Tro",
  Władca_Zwierząt: "Wla",
  Paladyn: "Pal",
  Kawalerzysta: "Kaw",
  Inkwizytor: "Ink",
  Łowca_Nieumarłych: "Low",
  Czarny_Strażnik: "Cza",
  Kapłan: "Kap",
  Kapłan_Talosa: "Tal",
  Kapłan_Helma: "Hel",
  Kapłan_Lathandera: "Lat",
  Kapłan_Tyra: "Tyr",
  Kapłan_Tempusa: "Tem",
  Druid: "Dru",
  Totemiczny_Druid: "Tot",
  Zmiennokształtny: "Zmi",
  Mściciel: "Msc",
  Mag: "Mag",
  Mag_Specjalista: "Mag",
  Dziki_Mag: "Dzi",
  Złodziej: "Zlo",
  Zabójca: "Zab",
  Łowca_Nagród: "Low",
  Zawadiaka: "Zaw",
  Tancerz_Cieni: "Tan",
  Bard: "Bar",
  Błazen: "Bla",
  Fechmistrz: "Fec",
  Skald: "Ska",
  Czarownik: "Cza",
  Uczeń_Smoka: "Ucz",
  Mnich: "Mni",
  Mnich_Ciemnego_Księżyca: "Cie",
  Mnich_Słonecznej_Duszy: "Slo",
  Szaman: "Sza",        
}



const Export: React.FC = () => {
  const {characterData, setCharacterData} = useCharacterContext()
  const {exportData, setExportData} = useExportDataContext()

  const getClassFile = (subclass: string) => {
    return subclassesExport[subclass as keyof SubclassesExport]
  }


  const handelBackendFile = async () => {

    let subclassExport = ""
    if(characterData.subclasses) {subclassExport = getClassFile(characterData.subclasses)}

    try {
      const respone = await fetch(`http://localhost:3000/${characterData.classes}/${subclassExport}.chr`)
      if(!respone.ok) {
        throw new Error("Failed to fetch file")
      }

      const arrayBuffer = await respone.arrayBuffer();
      let data = new Uint8Array(arrayBuffer);

      

      data = setGender(data)
      data = setRace(data)
      data = setPortrait(data)
      data = setAlignment(data)
      data = setAttriutes(data)
      data = setProficiencys(data)
      data = setName(data)
      data = setFileLenght(data)
      saveFile(data, "postac.chr")
    }
    catch (error) {
      console.error('Error handling file:', error)
    }
  }

  const setGender = (data: Uint8Array): Uint8Array => {
    data[0x2D9] = parseInt(exportData.gender, 16)  
    return data
  }

  const setRace = (data: Uint8Array): Uint8Array => {
   
    let characterAnimation = ""
    if(characterData.gender = "Kobieta") { characterAnimation += "1"}
    else{ characterAnimation += "0" }

    if(characterData.race == "Człowiek") {characterAnimation += "0"}
    if(characterData.race == "Elf" || characterData.race == "Pół_Elf") {characterAnimation += "1"}
    if(characterData.race == "Krasnolud") {characterAnimation += "2"}
    if(characterData.race == "Nizołek") {characterAnimation += "3"}
    if(characterData.race == "Gnom") {characterAnimation += "4"}
    if(characterData.race == "Pół_Ork") {characterAnimation += "5"}

    data[0x8C] = parseInt(characterAnimation, 16)
    data[0x2D6] = parseInt(exportData.race, 16)
    return data
  }

  const setPortrait = (data: Uint8Array): Uint8Array => {

    if(!exportData.portrait)
      {
      return data
    }

    const firstIndex = 0x98;
    const secondIndex = 0xA0;  

    for (let i = 0; i < exportData.portrait.length; i++) {
      const firstDataIndex = firstIndex + i;
      const secondDataIndex = secondIndex + i;
      
      data[firstDataIndex] = parseInt(exportData.portrait[i], 16)
      data[secondDataIndex] = parseInt(exportData.portrait[i], 16)
    }
    return data;
  }

  const setName = (data: Uint8Array): Uint8Array => {

    if(!exportData.name)
      {
      return data
    }

    const startIndex = 0x8;

    for (let i = 0; i < exportData.name.length; i++) {
      const dataIndex = startIndex + i;
      data[dataIndex] = parseInt(exportData.name[i], 16)
    }
    return data;
  }

  const setProficiencys = (data: Uint8Array): Uint8Array => {
    let updatedData = new Uint8Array(data);

    Object.entries(characterData.skills).forEach(([skill, value]) => {
      if(value > 0) {
        const proficiencyId = weaponProficiencysExport[skill as keyof WeaponProficiencysExport]
        if(proficiencyId === undefined){
          console.warn("nie znaleiono ID!")
          return
        }
        const newBytes = [
          ...new Array(8).fill(0x00),
          0xE9,
          ...new Array(11).fill(0x00),
          value, //wartość biegłości
          ...new Array(3).fill(0x00),
          proficiencyId, //id biegłości
          ...new Array(3).fill(0x00),
          0x09,
          ...new Array(7).fill(0x00), 
          0x64,
          ...new Array(83).fill(0x00),
          ...new Array(16).fill(0xFF), 
          ...new Array(20).fill(0x00), 
          ...new Array(4).fill(0xFF),  
          ...new Array(36).fill(0x00), 
          0x01,
          ...new Array(67).fill(0x00),
        ];

      updatedData[0x32C] += 1; //zwiększanie licznika biegłości

      const extendedData = new Uint8Array(updatedData.length + newBytes.length);
      extendedData.set(updatedData);
      extendedData.set(newBytes, updatedData.length);

      updatedData = extendedData;
      }
    })

    return updatedData;
  };

  const setThievingAbilites = (data: Uint8Array): Uint8Array => {
    
    Object.entries(characterData.skillsThief).forEach(([skillThief, value]) => {
      if(value > 0) {
        const thiefSkillId = thievingAbilitiesExport[skillThief as keyof ThievingAbilitiesExport]
        if(thiefSkillId === undefined){
          console.warn("Nie znaleziono ID!")
          return
        }

        data[thiefSkillId] = value

      }
    })

    return data
  }

  const setAlignment = (data: Uint8Array): Uint8Array => {
    data[0x2DF] = parseInt(exportData.character, 16)
    return data
  }
  
  const allowedClassesForModifier = ['Wojownik', 'Łowca', 'Paladyn'];
  const isModifierApplicable = (): boolean => {
    const selectedClass = characterData.classes;
    if (!selectedClass) return false;
    return allowedClassesForModifier.includes(selectedClass);
  };
  const setAttriutes = (data: Uint8Array): Uint8Array => {
    //ustawienie atubutów
    const hexStrength = characterData.attributes.strength.toString(16);
    const hexStrengthModifier = characterData.attributes.strenghtModifier.toString(16);
    const hexAgility = characterData.attributes.agility.toString(16);
    const hexConstitution = characterData.attributes.constitution.toString(16);
    const hexInteligence = characterData.attributes.intelligence.toString(16);
    const hexWisdom = characterData.attributes.wisdom.toString(16);
    const hexCharisma = characterData.attributes.charisma.toString(16);

    data[0x29C] = parseInt(hexStrength, 16)

    if(isModifierApplicable() &&  parseInt(hexInteligence, 16) == 0x18){
      data[0x29D] = parseInt(hexStrengthModifier) //wyjątkowa siła dla wojowników
    }
    else
    {
      data[0x29D] = 0x0
    }
    
    data[0x29E] = parseInt(hexInteligence, 16)
    data[0x29F] = parseInt(hexWisdom, 16)
    data[0x2A0] = parseInt(hexAgility, 16)
    data[0x2A1] = parseInt(hexConstitution, 16)
    data[0x2A2] = parseInt(hexCharisma, 16)
    return data;
    };
  
  const saveFile = (data: Uint8Array, fileName: string) => {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const setFileLenght = (data: Uint8Array): Uint8Array => {
    //dostosowanie długości pliku po dodaniu biegłości i czarów
    const fileLengthFrom64 = data.length - 0x64;
    data[0x2C] = fileLengthFrom64 & 0xFF;
    data[0x2D] = (fileLengthFrom64 >> 8) & 0xFF;
    return data;
  }

  const saveCharacterToServer = async () => {
    const payload = {
      ...characterData,
      skills: characterData.skills,
      //skillsThief: characterData.skillsThief,
    };

    const response = await fetch('http://localhost:3000/sendCharacter',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Character saved successfully:', result);
  }
    
  return (
    <>
      <h1 className="secondaryText">Eksport postaci</h1>
      <div className="secondaryBackground">
        <input className="plainButton" type="submit" onClick={handelBackendFile} />
        <button className="plainButton" onClick={saveCharacterToServer}>Zapisz postać w bazie</button>
      </div>
    </>
    
  );
};
    

export default Export;
