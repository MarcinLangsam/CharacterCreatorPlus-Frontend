import React, { useState } from 'react';

const LoreDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Wiedza
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                Wiedza (ang. Lore) - wiedza określa "naturalną" umiejętność postaci do identyfikowania i odkrywania magicznych właściwości przedmiotu.
                                Dzięki temu postać może odkryć niezidentyfikwany przedmiot magiczny, ilość wymaganej wiedzy zależna jest od przedmiotu.
                                <br/><br/>
                                Wiedza wzrasta naturalnie co poziom zależnie od klasy postaci. Postać otrzmuje też bonus do wiedzy zależny od statystyk <b>Iteligencji</b> oraz <b>Mądrości</b>.
                                <br/><br/>
                                Przedmioty można idetywikować też u kupców za złoto oraz za pomocą zaklęcia <b>IDENTYFIKACJA</b> nie zależnie od wiedzy postaci.
                                <br/><br/>
                                <a href="https://baldursgate.fandom.com/wiki/Lore">Lore - Baldur's Gate II Wiki</a>
                                </span>

                                <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                    Przyrost wiedzy na poziom:
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Klasa</th>
                                                <th>Wiedza na poziom</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>Bard, Błazen, Skald</td><td>+10</td></tr>
                                            <tr><td>Zawadiaka</td><td>+5</td></tr>
                                            <tr><td>Złodziej, Mag</td><td>+3</td></tr>
                                            <tr><td>Inne</td><td>+1</td></tr>
                                        </tbody>
                                    </table>
                                 </div>
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

export default LoreDescriptionPopup;
