import React, { useState } from 'react';

const PopupHelpPortrait: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openPopup} className="open-popup-button">
        ?
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Jak zainportować własny portret?</h2>
            <p>
              Aby zainportować własny portret należy spełnić kilka wymagań co do pliku:
              <ol>
                <li>1. Nazwa pliku nie może być dłuższa niż 8 znaków</li>
                <li>2. Plik musi być w formacie .bmp</li>
                <li>3. Plik musi mieć 24bit-ową głębię kolorów</li>
                <li>4. Rozdzielczość jest dowolna do 1024px ale najlepiej aby była minimum 169x266px, dodatkowo być w proporcjach wysokość:szerokość 1.5:1 aby nie był zniekształcony</li>
                <li>5. Plik z portretem musi się znajdować w folderze gry w dokumentach z portretami (/Documents/Baldur's Gate - Enhanced Edition/Portraits)</li>
              </ol>
            </p>
            <div className="popup-buttons">
              <button onClick={closePopup} className="popup-button">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupHelpPortrait;
