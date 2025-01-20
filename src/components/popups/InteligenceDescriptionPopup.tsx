import React, { useState } from 'react';

const InteligenceDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Inteligencja
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Inteligencja (ang. Intelligence) - cecha ta określa wiedzę postaci, jej potencjał magiczy oraz używanie magicznych przedmiotów. Inteligencja od 15 do 17 jest wymagana do dwuklasowości w magów.<br/>
                                    Inteligencja wpływa bezpośrednio na:<br/>
                                    <b>Wiedzę, (Magowie i Bardowie) Maksymalny poziom zaklęć, Maksymalna ilość zaklęć w księdze czarów, Szansę przepisania zwoju</b>
                                    <br/><br/>
                                    *Dodatkowo większa inteligencja chroni przed zaklęciami wysysającymi atrybut inteligencji (jeśli wyssany atrybut osiągnie 0 postać umiera śmiercią permanentną)<br/>
                                    *Inteligencja wartości przynajmniej 9 jest potrzebna do używania zwojów/różdżek<br/>
                                    *Skraca czas negatywnego zaklęcia <b>LABIRYNT</b>
                                    <br/><br/>
                                    Maksymalny poziom zaklęć dla magów to 9, który wymaga 18 inteligencji, dla bardów jest to poziom 6 wymagający 12 inteligencji.
                                    Warto mieć na uwadzę, że jest to wymóg tylko przepisania zwoju do księgi czarów, więc można zwiększyć tymczasowo inteligencje w trakcie gry, przepisać zwój i używać czarów wyższego poziomu pomimmo mniejszej inteligencji. 
                                    Podobnie z ilością zaklęć.
                                    <br/><br/>
                                    <b>Bazowe wartości głównych atrybutów naturalnie nie ulegają powiększeniu w trakcie gry!</b>
                                    <br/>
                                    Sposoby na pernamentne powiększenie inteligencji w trakci gry:<br/>
                                    Baldur's Gate I: +1 za przeczytanie "Tome of Clear Thought"<br/>
                                    Baldur's Gate II Throne of Bhaal: (tylko dla magów/czarodzieji) +1 za wybór karty z gwiazdą z Tali Wielu Rzeczy<br/>
                                    Baldur's Gate II Throne of Bhaal: +1 za poprawną obsługę "Machine of Lum the Mad"
                                    <br/><br/>
                                    <a href="https://baldursgate.fandom.com/wiki/Intelligence">Intelligence - Baldur's Gate II Wiki</a>
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

export default InteligenceDescriptionPopup;
