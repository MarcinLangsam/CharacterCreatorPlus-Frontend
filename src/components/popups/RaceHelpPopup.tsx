import React, { useState } from 'react';

const RaceHelpPopup: React.FC = () => {
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
            <h1 className='secondary-text'>Wybór rasy</h1>
            <span>
            Wybór rasy jest najistotniejszym elementem. Będzie on rzutował na tożsamość i przynależność twojej postaci do danego miejsca w świecie Baldur's Gate. 
              Decyduje również o wyglądzie twojej postaci.
              <br/><br/>
              Mechanicznie dedykuje jaką możesz wybrać klasę oraz jakie będą maksymalne wartości twoich atrybutów. 
              Każda rasa ma też swoje unikatowe bonusy bądź wady. Mają one swoje predyspozycje i skłonności do pewnych klas i umiejętności ale
              nic nie stoi na przeszkodzie aby wybrać to co podpowiada ci serce i przeżycie przygody na twój własny sposób. 
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

export default RaceHelpPopup;
