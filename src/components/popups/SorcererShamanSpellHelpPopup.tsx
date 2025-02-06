import React, { useState } from 'react';

const SorcererShamanSpellsHelpPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openPopup} className="standard-button">
        ?
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h1 className='secondary-text'>Wybór zaklęć czarownika/szamana</h1>
            <span>
              Czarownik ma dostęp do zaklęć wtajemniczenia a szaman do zaklęć kapłanskich. W obu przypadkach
              wybierz jakie zaklęcia będą dla ciebie znane na start gry. Nowe zaklęcia możesz poznawać tylko przy awansach
              na nowy poziom postaci. Zaklęcia można rzucać bez przygotowywania (zapamiętywania) zdefionowaną ilość razy resetującą
              się po odpoczynki. Czarownik oraz szaman mają dostępn do kilki unikatowych dla siebie zaklęć. Szaman automatycznie ma je
              w swojej księdze zaklęć.
            </span>
            <div className="popup-buttons" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
              <button onClick={closePopup} className="standard-button">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SorcererShamanSpellsHelpPopup;
