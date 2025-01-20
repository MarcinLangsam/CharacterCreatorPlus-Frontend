import React, { useState } from 'react';

const CharismaDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Charyzma
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Charyzma (ang. Charisma) - cecha ta określa reakcje postaci niezależnych oraz zniżki za ładną buźkę. Charyzma od 15 do 17 jest wymaga do dwuklasowości w druidów/tancerzów cieni.<br/>
                                    Charyzma wpływa bezpośrednio na:<br/>
                                    <b>Reakcje NPC, Zniżkę w sklepach</b>
                                    *Charyzma ma pewien wpływ na dialogi i nagordy za zadania lecz w praktyce są one skrajnie marginalne. 
                                    <br/><br/>
                                    Jeśli jednak chcesz przeczytać garść innych dialogów można spróbować ze skrajnymi wartościami charyzmy.
                                    <br/><br/>
                                    <b>Bazowe wartości głównych atrybutów naturalnie nie ulegają powiększeniu w trakcie gry!</b>
                                    <br/>
                                    Sposoby na pernamentne powiększenie charyzmy w trakci gry:<br/>
                                    Baldur's Gate I: +1 za przeczytanie "Tome of Leadership and Influence"<br/>
                                    Baldur's Gate II Shadows of Amn: +1 za wybór dobra podczas Próby Gniewu <br/>
                                    Baldur's Gate II Throne of Bhaal: +1 za poprawną obsługę "Machine of Lum the Mad"
                                    <br/><br/>
                                    <a href="https://baldursgate.fandom.com/wiki/Charisma">Charisma - Baldur's Gate II Wiki</a>
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

export default CharismaDescriptionPopup;
