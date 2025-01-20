import React, { useState } from 'react';

const IntoxicatedDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Próg upojenia alkocholowego
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Upojenie alkocholowe (ang. Intoxicated) - określa jak bardzo postać upiję się jednym napitkiem w tawernie. 
                                    Osiągnięcie minimum wartości 50 wprowadza postać w stan upojenia, które zależnie od swojego poziomu ma następujące efekty:<br/>
                                    0-49 upojenia: brak bonusów bądź negatywów<br/>
                                    50-59 upojenia: -2 szczęścia and +2 morale<br/>
                                    60-69 upojenia: -4 szczęścia and +4 morale<br/>
                                    70-79 upojenia: -6 szczęścia and +6 morale<br/>
                                    80-89 upojenia: -8 szczęścia and +8 morale<br/>
                                    90-99 upojenia: -10 szczęścia and +10 morale<br/>
                                    100 upojenia (max): -12 szczęścia and +12 morale<br/>
                                    <br/><br/>
                                    Upojenie alkocholowe ustępuje po odpoczynku bądź użyciu większości zaklęć leczących w tym <b>SPOWOLNIENIE TRUCIZNY</b>
                                <br/><br/>
                                <a href="https://baldursgate.fandom.com/wiki/Intoxicated">Intoxicated - Baldur's Gate II Wiki</a>
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

export default IntoxicatedDescriptionPopup;
