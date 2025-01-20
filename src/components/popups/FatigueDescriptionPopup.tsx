import React, { useState } from 'react';

const FatigueDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Zmęczenie
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Zmęczenie (ang. Fatigue) - zbyt długi upływ czasu bez odpoczynku skutkuje zmęczeniem postaci, zmęczenie negatywnie wpływa na wartość szczęścia. 
                                    Każda postać zaczyna z bazowym zmęczeniem 0, od wartości 7 otrzmuje karę -1 do szczęscia aż do -94 przy wartości zmęczenia 100. 
                                    Dodatkowo postać męczy się używając zaklęć <b>PRZYŚPIESZENIE, PRZYWRUCENIE, PRZEMIANA W ZABÓJCĘ</b>
                                    <br/><br/>
                                    Na prędkość nabudowywania się zmęczenia w wyniku upływu czasu ma wpływ statystyka <b>Kondycji</b>, 
                                    postacie z większą kondycją męczą się wolniej.
                                    <br/><br/>
                                    <a href="https://baldursgate.fandom.com/wiki/Fatigue">Fatigue - Baldur's Gate II Wiki</a>
                                </span>
                            </div>
                            <div className="popup-buttons" style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <button onClick={closePopup} className="standard-button">
                                    OK
                                </button>
                            </div>
                        </div>
                        
                    </div>
                )}
            </div>
        </>
    )
}

export default FatigueDescriptionPopup;
