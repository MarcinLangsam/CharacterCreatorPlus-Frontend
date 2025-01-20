import React, { useState } from 'react';

const WisdomDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Mądrość
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Mądrość (ang. Wisdom) - cecha ta określa wiedzę postaci, potencjał magiczy kapłanów oraz druidów. Mądrość od 15 do 17 jest wymagana do dwuklasowości w kleryków/druidów.<br/>
                                    Mądrość wpływa bezpośrednio na:<br/>
                                    <b>Wiedzę, (Kapłani/Druidzi) Maksymalny poziom zaklęć, Ilość znanych czarów</b>
                                    <br/><br/>
                                    *Dodatkowo wysoka wiedza nie musi być zbędna dla magów. Zaklęcie <b>ŻYCZENIE, OGRANICZONE ŻYCZENIE</b> wymaga wysokiej mądrości aby wybrać potężniejsze i korzystniejsze efekty.
                                    <br/><br/>
                                    <b>Bazowe wartości głównych atrybutów naturalnie nie ulegają powiększeniu w trakcie gry!</b>
                                    <br/>
                                    Sposoby na pernamentne powiększenie mądrości w trakci gry:<br/>
                                    Baldur's Gate I: +1 x3 za przeczytanie "Tome of Understanding"<br/>
                                    Baldur's Gate II Shadows of Amn: +1 za wybór dobra podczas Próby Gniewu<br/>
                                    Baldur's Gate II Throne of Bhaal: (tylko dla Kapłanów/Druidów/Szamanów) +1 za wybór karty z gwiazdą z Tali Wielu Rzeczy<br/>
                                    Baldur's Gate II Throne of Bhaal: +1 za poprawną obsługę "Machine of Lum the Mad"
                                    <br/><br/>
                                    <a href="https://baldursgate.fandom.com/wiki/Wisdom">Wisdom - Baldur's Gate II Wiki</a>
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

export default WisdomDescriptionPopup;
