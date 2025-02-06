import React, { useState } from 'react';

const ProficiencysHelpPopup: React.FC = () => {
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
            <h1 className='secondary-text'>Wybór beigłości</h1>
            <span>
              Postać może się posługiwać wszystkimi niżej wymienonymi bronmi. Rozdawanie punktów wpływa tylko na skutezność w walce daną bronią.
              Możliwośc posługiwania się daną bronia i jej próg jest zależy od klasy.<br/>
              Można uzyskać następujące benefity:<br/>
              0 punktów - kara do Trak0,<br/>
              1 punkt (Wyszkolony) - postać używa broni bez żadnej kary,<br/>
              2 punkty (Specjalizacja) - +1 do Thaco0, +2 do obrażeń, (tylko klas wojowniczych) +1/2 ataku na rundę,<br/>
              3 punkty (Mistrz) - +3 do Thaco0, +3 do obrażeń, (tylko klas wojowniczych) +1/2 ataku na rundę,<br/>
              4 punkty (Prawdziwy Mistrz) - +3 do Thaco0, +4 do obrażeń, -1 do opuźnienia, (tylko klas wojowniczych) +1/2 ataku na rundę,<br/>
              5 punkty (Wielki Mistrz) - +3 do Thaco0, +5 do obrażeń, -3 do opuźnienia, (tylko klas wojowniczych) +1 ataku na rundę, Ten poziom można osiągnąć w trakcie gry na wyższysz poziomach doświadczenia postaci,
              <br/><br/>
              Dodatkowo oprócz biegłości daną broanią niektóre klasy mają dostęp do stylów broni zapewniające kolejne, niezależne bonusy od biegłości:<br/>
              Styl walki bronią dwuręczną:<br/>
              0 punktów - brak bonusów,<br/>
              1 punkt - +1 do obrażeń, -2 do opuźnienia, trafienia krytyczne przy rzucie 19 i 20 (nie tylko 20)<br/>
              2 punkt - +1 do obrażeń, -4 do opuźnienia, trafienia krytyczne przy rzucie 19 i 20 (nie tylko 20)<br/>
              Styl walki mieczem i tarczą (pomimo nazwy "mieczem" ztosowany dla wszystkich broni jednoręcznych):<br/>
              1 punkt - -2 do KP dla pocisków<br/>
              2 punkt - -4 do KP dla pocisków<br/>
              0 punktów - brak bonusów,<br/>
              1 punkt - -1 do KP trafienia krytyczne przy rzucie 19 i 20 (nie tylko 20)<br/>
              2 punkt - -2 do KP trafienia krytyczne przy rzucie 19 i 20 (nie tylko 20)<br/>
              Styl walki dwoma brońmi (psotać atakuję częściej ale z karą -4 trafienia do głównej ręki oraz -8 do drugiej):<br/>
              1 punkt - modyfikatory te są zmniejszone odopwiednio do -2 i -4<br/>
              2 punkt - modyfikatory te są zmniejszone odopwiednio do 0 i -2
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

export default ProficiencysHelpPopup;
