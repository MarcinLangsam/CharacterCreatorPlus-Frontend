import React, { useState } from 'react';

const InstructionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Kliknij Mnie
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Kliknij Mnie - przykładowe okno dialogowe do, których warto zaglądać {":)"}
                                </span>
                            </div>
                            <div className="popup-buttons" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <button onClick={closePopup} className="standard-button">
                                    Naciśnij mnie aby zamknąć to okno
                                </button>
                            </div>
                        </div>
                        
                    </div>
                )}
            </div>
        </>
    )
}

export default InstructionPopup;
