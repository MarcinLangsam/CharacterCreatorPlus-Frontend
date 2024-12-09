import React, { useState } from 'react';

const HexEdit: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [hexValues, setHexValues] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Sprawdzenie długości nazwy pliku
      if (file.name.length > 8) {
        setError('File name must be 8 characters or less.');
        setImagePreview(null); // Reset podglądu obrazu
        setFileName(null); // Reset nazwy pliku
        setHexValues([]); // Reset wartości hex
        return;
      }

      setError(null); // Reset błędów, jeśli warunek spełniony

      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      setFileName(file.name);

      // Konwersja nazwy pliku do wartości szesnastkowych
      const hexArray = Array.from(file.name).map((char) =>
        char.charCodeAt(0).toString(16)
      );
      setHexValues(hexArray);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {imagePreview && (
        <div style={{ marginTop: '20px' }}>
          <h2>Preview:</h2>
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}
      {fileName && (
        <div style={{ marginTop: '20px' }}>
          <h2>File Name:</h2>
          <p>{fileName}</p>
        </div>
      )}
      {hexValues.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Hexadecimal Values:</h2>
          <p>{hexValues.join(' ')}</p>
        </div>
      )}
    </div>
  );
};

export default HexEdit;