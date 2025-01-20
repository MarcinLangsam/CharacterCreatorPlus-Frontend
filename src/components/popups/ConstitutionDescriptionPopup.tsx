import React, { useState } from 'react';

const ConstitutionDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Kondycja
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Kondycja (ang. Constitution) - cecha ta określa zdrowie postaci, odporność na zmęczenie oraz to kto pierwszy odpadnie przy barze.<br/>
                                    Kondycja wpływa bezpośrednio na:<br/>
                                    <b>Zdrowie na poziom, Zmęczenie, Upojenie Alkocholowe, (Tylko krasnoludy/Gnomy/Niziołki) Bonus do rzutów obronnych</b>
                                    <br/><br/>
                                    Oprócz kości zdrowia charakterystycznej dla danej klasy wartość zdrowia jest powiększana o bonus wynikający z kondycji. Należy mieć na uwadzę kilka mankamentów:<br/>
                                    Dla klas wojowniczych kość zdrowia + bonus jest apikowany od 1 do 9 poziomu, od poziomu 10 stały przyrost +3 zdrowia, (max bez blokady)<br/>
                                    Dla klas kapłańskich kość zdrowia + bonus jest apikowany od 1 do 9 poziomu, od poziomu 10 stały przyrost +2 zdrowia, (max bonus +2)<br/>
                                    Dla klas złodziejskich kość zdrowia + bonus jest apikowany od 1 do 10 poziomu, od poziomu 11 stały przyrost +2 zdrowia, (max bonus +2)<br/>
                                    Dla klas magów/czarodziji kość zdrowia + bonus jest apikowany od 1 do 10 poziomu, od poziomu 11 stały przyrost +1 zdrowia, (max bonus +2)<br/>
                                    <br/>
                                    Krasnoludy oraz Niziołki otrzymują bonus do rzutów obronnych przeciw śmierci, różdżką, zaklęcią. A gnomy przeciw różdżką i zaklęcią.
                                </span>

                                <span>
                                    *Kondycja minimum o wartości 20 zapewnia powolną regenerację zdrowia przyśpieszającą wraz z wyrzszymi wartościami.<br/>
                                    <b>Bazowe wartości głównych atrybutów naturalnie nie ulegają powiększeniu w trakcie gry!</b>
                                    <br/>
                                    Sposoby na pernamentne powiększenie kondycji w trakci gry:<br/>
                                    Baldur's Gate I: +1 za przeczytanie "Manual of Bodily Health"<br/>
                                    Baldur's Gate II Shadows of Amn: +2 za ofiarowanie Łzy Bhaala podczas Prób Strachu<br/>
                                    Baldur's Gate II Throne of Bhaal: +1 za poprawną obsługę "Machine of Lum the Mad"
                                    <br/><br/>
                                    <a href="https://baldursgate.fandom.com/wiki/Constitution">Constitution - Baldur's Gate II Wiki</a>
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

export default ConstitutionDescriptionPopup;
