import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { useExportDataContext } from "../context/ExportDataContext";
import Popup from "./popups/HelpPortraitPopup";

type Portrait = {
  id: number;
  fileName: string;
};

const Portrait: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string | null>(null);
  const [hexValues, setHexValues] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [portraitsData, setPortraitsData] = useState<Portrait[]>([]);
  const [currentPortraitIndex, setCurrentPortraitIndex] = useState<number>(0);

  const {characterData, setCharacterData} = useCharacterContext();
  const {exportData, setExportData} = useExportDataContext();

  const fetchPortraitsName = async () => {
    try {
      let response = undefined
      if(characterData.gender == "Mężczyzna") {response = await fetch("http://localhost:3000/portraitsNamesMale");}
      if(characterData.gender == "Kobieta") {response = await fetch("http://localhost:3000/portraitsNamesFemale");}
      
      if(response != undefined) {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Portrait[] = await response.json();
        setPortraitsData(data);
        console.log(data)
      }
    } catch (error) {
      console.error("Error fetching portrait names:", error);
    }
  };

  const fetchPortrait = async (fileName: string) => {
    try {
      let response = undefined
      if(characterData.gender == "Mężczyzna") {response = await fetch(`http://localhost:3000/MalePortraits/${fileName}`);}
      if(characterData.gender == "Kobieta") {response = await fetch(`http://localhost:3000/FemalePortraits/${fileName}`);}
      
      if(response != undefined) {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const urlData = await response.blob();
        const fileUrl = URL.createObjectURL(urlData);
        return fileUrl;
      }
    } catch (error) {
      console.error("Error fetching portrait:", error);
      return "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      const fileNameParts = file.name.split('.');
      const extension = fileNameParts.pop(); // rozszerzenie pliku
      const baseName = fileNameParts.join('.');
        
        if (baseName.length > 8) {
        setError('Nazwa pliku nie może mieć więcej niż 8 znaków.');
        setImagePreview(undefined);
        setFileName(null);
        setHexValues([]);
        return;
        }

        setError(null);

        const fileUrl = URL.createObjectURL(file);
        setImagePreview(fileUrl);
        setCharacterData((prev) => ({
            ...prev,
            portrait: baseName,
        }))

        setFileName(baseName);

        const hexArray = Array.from(baseName).map((char) =>
        char.charCodeAt(0).toString(16)
        );
        setHexValues(hexArray);
        setExportData((prev) => ({
            ...prev,
            portrait: hexArray,
        }))
    }
  };

  const handlePortraitClick = async (name: string) => {
    const fileUrl = await fetchPortrait(name);
    setImagePreview(fileUrl);
    setCharacterData((prev) => ({
        ...prev,
        portrait: name,
    }))

    setFileName(name);

    const hexArray = Array.from(name).map((char) =>
    char.charCodeAt(0).toString(16)
    );
    setHexValues(hexArray);
    setExportData((prev) => ({
        ...prev,
        portrait: hexArray,
    }))
  };

  const handlePrev = () => {
    if (currentPortraitIndex > 0) {
      const newIndex = currentPortraitIndex - 1;
      setCurrentPortraitIndex(newIndex);
      handlePortraitClick(portraitsData[newIndex].fileName);
    }
  };

  const handleNext = () => {
    if (currentPortraitIndex < portraitsData.length - 1) {
      const newIndex = currentPortraitIndex + 1;
      setCurrentPortraitIndex(newIndex);
      handlePortraitClick(portraitsData[newIndex].fileName);
    }
  };

  useEffect(() => {
    fetchPortraitsName();
  }, []);

  return (
    <>
      <h1 className="secondary-text">Wybierz Portret</h1>
      <div className="d-flex flex-row">
        <div>
          <label htmlFor="file-upload" className="standard-button">
            Dodaj własny portret
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <Popup/>
      </div>
      <div className="d-flex flex-row">
        <div className="creation-background">
          {error && (
            <div style={{ marginTop: '10px', color: 'red' }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          <div
            className="d-flex flex-row justify-content-center align-items-center" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
            <button className="arrow-left" onClick={handlePrev} disabled={currentPortraitIndex === 0}/>
            <img
              src={characterData.portrait === "" ? "http://localhost:3000/images/nonePortrait.png" : imagePreview}
              alt=""
              style={{ maxWidth: "300px", maxHeight: "300px", margin: "5px" }}
            />
            <button className="arrow-right" onClick={handleNext} disabled={currentPortraitIndex === portraitsData.length - 1}/>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "15px", overflow: 'auto', width: '75%', height: '65vh' }}>
          {portraitsData.map((portrait, index) => (
              <div
                key={portrait.id}
                onClick={() => {
                  setCurrentPortraitIndex(index);
                  handlePortraitClick(portrait.fileName);
                }}
                style={{
                  cursor: "pointer",
                  margin: "5px",
                  border: currentPortraitIndex === index ? "3px solid yellow" : "3px solid gray",
                }}
              >
                <img
                  src={
                    characterData.gender === "Mężczyzna"
                      ? `http://localhost:3000/MalePortraits/${portrait.fileName}`
                      : `http://localhost:3000/FemalePortraits/${portrait.fileName}`
                  }
                  alt={portrait.fileName}
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            ))}
          </div>
      </div>
      
    </>
  );
};

export default Portrait