import React, { useState } from 'react';

const ClassHelpPopup: React.FC = () => {
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
            <h1 className='secondary-text'>Wybór klasy</h1>
            <span>
              Jest to drugi naistotniejszy wybór ponieważ decydujesz nim swój styl rozgrywki i umiejętności za pomocą, których będziesz pokonywać stawiane tobie wyzwania.
              <br/><br/>
              Klasa determinuje minimalne wartości atrybutów oraz wachlaż umiejętności bojowych i użytkowych. 
              Dodatkowo od klasy zależy jakim rodzajem ekwipunku może posługiwać się twoja postać (bronie, zbroje, tarcze, zwoje, różdżki itp.).
              (Prawie) Każda klasa ma swoje podklasy, które dodatkowo narzucają bonusy jak i wady w obrębie specyfikacji danej klasy.<br/>
              Wybierz klasę oraz podklasę aby wyświetlić ich szczegółowe opisy.
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

export default ClassHelpPopup;
