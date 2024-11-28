import React, { useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';

const Export: React.FC = () => {
    const {characterData, setCharacterData} = useCharacterContext()


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            if (arrayBuffer) {
              let data = new Uint8Array(arrayBuffer);
              data = addBytes(data);
              data = updateOffsets(data);
              saveFile(data, `${file.name}`);
            }
          };
          reader.readAsArrayBuffer(file);
        }
      };
    
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
    
        const extendedData = new Uint8Array(data.length + newBytes.length);
        extendedData.set(data);
        extendedData.set(newBytes, data.length);
        return extendedData;
      };
    
      const updateOffsets = (data: Uint8Array): Uint8Array => {
        const fileLengthFrom64 = data.length - 0x64;
        data[0x2C] = fileLengthFrom64 & 0xFF;
        data[0x2D] = (fileLengthFrom64 >> 8) & 0xFF;

        //tutaj nadanie wartości siły do konkretnego miejsca w pliku heksadecymalnym
        const hexStrength = characterData.attributes.strength.toString(16);
        const hexAgility = characterData.attributes.agility.toString(16);
        const hexConstitution = characterData.attributes.constitution.toString(16);
        const hexInteligence = characterData.attributes.intelligence.toString(16);
        const hexWisdom = characterData.attributes.wisdom.toString(16);
        const hexCharisma = characterData.attributes.charisma.toString(16);

        data[0x29C] = parseInt(hexStrength, 16)
        //data[0x29D] = bonus siły
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
          <input type="file" onChange={handleFileUpload} />
        </div>
      );
    };
    

export default Export;
