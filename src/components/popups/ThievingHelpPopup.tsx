import React, { useState } from 'react';

const ThievingHelpPopup: React.FC = () => {
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
            <h1 className='secondary-text'>Wybór umiejętności złodziejskich</h1>
            <span>
              W grze można napotkać niezliczoną ilośc pułapek, iluzji, zamków do otwraci i miejsc gdzie możan się zakraść nie pozstrzerzenie.
              Umiejętności złodzijskie są nieocenioną a może i nawet niezbędną pomocą w każdej przygodzie. Wszystkie z nich są równie cenne choć 
              znajdywanie pułapek oraz otwieranie zamków wyjade się się być priorytetem. Nie warto inwestować w żadną z tych umiejętności więcej niż 100!
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

export default ThievingHelpPopup;
