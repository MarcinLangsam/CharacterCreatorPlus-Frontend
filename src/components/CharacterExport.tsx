import React, { useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useExportDataContext } from '../context/ExportDataContext';

const Export: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext()
    const {exportData, setExportData} = useExportDataContext()

    const getClassFile = (subclass: string) => {
      const sublcasses ={
        "Wojownik"
        "Berserker"
        "Zabójca_Magów"
        "Kensai"
        "Krasnoludzki_Obrońca"
        "Barbarzyńca"
        "Łowca"
        "Łucznik"
        "Tropiciel"
        "Władca_Zwierząt"
        "Paladyn"
        "Kawalerzysta"
        "Inkwizytor"
        "Łowca_Nieumarłych"
        "Czarny_Strażnik"
        "Kapłan"
        "Kapłan_Talosa"
        "Kapłan_Helma"
        "Kapłan_Lathandera"
        "Kapłan_Tyra"
        "Kapłan_Tempusa"
        "Druid"
        "Totemiczny_Druid"
        "Zmiennokształtny"
        "Mściciel"
        "Mag"
        "Mag_Specjalista"
        "Dziki_Mag"
        "Złodziej"
        "Zabójca"
        "Łowca_Nagród"
        "Zawadiaka"
        "Tancerz_Cieni"
        "Bard": "Bar",
        "Błazen": "Bla",
        "Fechmistrz": "Fec",
        "Skald": "Ska",
        "Czarownik"
        "Uczeń_Smoka"
        "Mnich"
        "Mnich_Ciemnego_Księżyca"
        "Mnich_Słonecznej_Duszy"
        "Shaman"

        
      }
      let subclassId = ""

      if(subclass = "")

      return subclassId
    }

    fetch(`http://localhost:3000/wojownik/wojownik.chr`)
      .then((response) => {
        if(!response.ok) {
          throw new Error("file not found");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = ""
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading file: ", error);
      });

      const handelBackendFile = async () => {
        try {
          const respone = await fetch("http://localhost:3000/wojownik/wojownik.chr")
          if(!respone.ok) {
            throw new Error("Failed to fetch file")
          }

          const arrayBuffer = await respone.arrayBuffer();
          let data = new Uint8Array(arrayBuffer);

          data = addBytes(data)
          data = updateOffsets(data)
          saveFile(data, "test.txt")
        }
        catch (error) {
          console.error('Error handling file:', error)
        }
      }

      
      const addBytes = (data: Uint8Array): Uint8Array => {
        const newBytes = [
          ...new Array(8).fill(0x00),  // 8 bajtów 00
          0xE9,                       // 1 bajt E9
          ...new Array(11).fill(0x00), // 11 bajtów 00
          0x03,                       // 1 bajt 03
          ...new Array(3).fill(0x00),  // 3 bajty 00
          0x64,                       // 1 bajt 64
          ...new Array(3).fill(0x00),  // 3 bajty 00
          0x09,                       // 1 bajt 09
          ...new Array(7).fill(0x00),  // 7 bajtów 00
          0x64,                       // 1 bajt 64
          ...new Array(83).fill(0x00), // 83 bajty 00
          ...new Array(16).fill(0xFF), // 16 bajtów FF
          ...new Array(20).fill(0x00), // 20 bajtów 00
          ...new Array(4).fill(0xFF),  // 4 bajty FF
          ...new Array(36).fill(0x00), // 36 bajtów 00
          0x01,                       // 1 bajt 01
          ...new Array(67).fill(0x00), // 67 bajtów 00
        ];

        data[0x32C] += 1; //zwiększenie licznika bigłości
    
        const extendedData = new Uint8Array(data.length + newBytes.length);
        extendedData.set(data);
        extendedData.set(newBytes, data.length);
        return extendedData;
      };
    
      const updateOffsets = (data: Uint8Array): Uint8Array => {
        //dostosowanie długości pliku po dodaniu biegłości i czarów
        const fileLengthFrom64 = data.length - 0x64;
        data[0x2C] = fileLengthFrom64 & 0xFF;
        data[0x2D] = (fileLengthFrom64 >> 8) & 0xFF;

        //ustawienie płci

        
        //ustawienie atubutów
        const hexStrength = characterData.attributes.strength.toString(16);
        const hexAgility = characterData.attributes.agility.toString(16);
        const hexConstitution = characterData.attributes.constitution.toString(16);
        const hexInteligence = characterData.attributes.intelligence.toString(16);
        const hexWisdom = characterData.attributes.wisdom.toString(16);
        const hexCharisma = characterData.attributes.charisma.toString(16);

        data[0x29C] = parseInt(hexStrength, 16)
        //data[0x29D] = bonus siły //wyjątkowa siła
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
      
      return (
        <div>
          <h1>Zapis</h1>
          <input type="file" onChange={handelBackendFile} />
          <p>{exportData.gender}</p>
          <p>{exportData.portrait}</p>
        </div>
      );
    };
    

export default Export;
