import React, { useState } from 'react';

const WizardSpellsHelpPopup: React.FC = () => {
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
            <h1 className='secondary-text'>Wybór zaklęć maga</h1>
            <span>
              Magowie oraz bardowie mają dostęp do zaklęć wtajemniczenia. Z poniższej listy wybierz zaklęcia, które chcesz znać na start gry 
              oraz w jakiej ilości zapamiętasz je aby były gotowe do rzucenia, te drugie możesz dowolnie zmieniać w trakcie odpoczynku w grze.
              Magowie mogą również przepisywać zaklęcia ze zwojów i poznać je na stałe, więć prędzej czy później można mieć dostep do wszytkich 
              wypisanych tu zaklęć. Ilość zapamiętach zaklęć na raz zwiększa się z poziomem postaci.
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

export default WizardSpellsHelpPopup;
