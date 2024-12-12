import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../context/CharacterContext";
import { useExportDataContext } from "../context/ExportDataContext";

const Portrait: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [hexValues, setHexValues] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {characterData, setCharacterData} = useCharacterContext();
    const {exportData, setExportData} = useExportDataContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {


        const file = event.target.files?.[0];
        if (file) {

          const fileNameParts = file.name.split('.');
          const extension = fileNameParts.pop(); // rozszerzenie pliku
          const baseName = fileNameParts.join('.');
            
            if (baseName.length > 8) {
            setError('Nazwa pliku nie może mieć więcej niż 8 znaków.');
            setImagePreview(null);
            setFileName(null);
            setHexValues([]);
            return;
            }

            setError(null);

            const fileUrl = URL.createObjectURL(file);
            setImagePreview(fileUrl);
            setCharacterData((prev) => ({
                ...prev,
                portrait: fileUrl,
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

    return (
      <>
        <h1 className="secondaryText">Wybierz Portret</h1>
        <div className="secondaryBackground">
          <input className="plainButton" type="file" accept="image/*" onChange={handleFileChange} />
          {error && (
            <div style={{ marginTop: '10px', color: 'red' }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          {imagePreview && (
            <div>
              <h2 className="tertiaryTextNoHover">Podgląd:</h2>
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                style={{ maxWidth: '300px', maxHeight: '300px'}}
              />
            </div>
          )}
        </div>
      </>
      );
    };

export default Portrait

function setPreviewUrl(fileUrl: string) {
    throw new Error("Function not implemented.");
}
