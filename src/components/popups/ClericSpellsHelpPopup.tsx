import React, { useState } from 'react';

const ClericSpellsHelpPopup: React.FC = () => {
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
            <h1 className='secondary-text'>Wybór zaklęć kapłana</h1>
            <span>
              Kapłani oraz druidzi mają dostęp do zaklęć kapłańskich. Poniższa lista zawiera zaklęcia, które twoja postać już zna automatycznie, 
              wybierz w jakiej ilości zapamiętasz je aby były gotowe do rzucenia. Możesz je dowolnie zmieniać w trakcie odpoczynku w grze. Ilość zapamiętanych zaklęć
              zwiększa się wraz z poziomem postaci oraz przez statystykę MĄDROŚCI. Warto wspomnieć, że kapłan i druid mają pulę zaklęć wspólnych ale każdy z nich
              zawiera kilka unikatowych zaklęć.
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

export default ClericSpellsHelpPopup;
