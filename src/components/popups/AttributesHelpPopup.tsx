import React, { useState } from 'react';

const AttributesHelpPopup: React.FC = () => {
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
            <h1 className='secondary-text'>Współczynniki</h1>
            <span>
                Współczynniki determinują jakość twoich umiejętności, statystyk oraz cech.<br/>
                Możesz kliknąć na wybrany atrybut w oknie postaci aby dokładnie podejżeć na co ma wpływ.
                Możesz powtarzać rzut atrybutów do uzyskania satysfakcjonujących cię wartości.
                W trakcie gry jest również wiele przedmiotów, które <strong>tymczasowo</strong> zwiększają atrybuty.
                <br/><br/>
                <strong>UWAGA: Oprócz nie licznych przypadków zamieszczonych w opisach atrybutów, w trakcie gry atrybuty NIE ulegają pernamentnej zmianie.</strong> 
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

export default AttributesHelpPopup;
