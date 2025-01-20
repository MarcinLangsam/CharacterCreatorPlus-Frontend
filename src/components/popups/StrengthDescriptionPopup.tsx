import React, { useState } from 'react';

const StrengthDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Siła
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Siła (ang. Strength) - cecha ta określa skuteczność postaci w walce wręcz (oraz proce i broń miotana), wyważaniu zamków oraz jak wiele może unieść. 
                                    Jest najważniejszą cechą klas wojowniczych gdzie wartość przynajmniej 15 do 17 są wymagane aby wykorzystać dwuklasowość w te klasy.<br/>
                                    Siła wpływa bezpośrednio na: <br/>
                                    <b>Thac0, Obrażenia, Wyważanie Zamków, Udźwig</b><br/>
                                    Dodatkowo większa siła chroni przed zaklęciami wysysającymi atrybut siły (jeśli wyssany atrybut osiągnie 0 postać umiera śmiercią permanentną)
                                    <br/><br/>
                                    Wyjątkowa siła:<br/>
                                    Wszystkie klasy wojownicze oprócz niziołków mają dostęp do wyjątkowej siły, jest to dodatkowe wzmocnienie losowane przy rzucie atrybutów.
                                    Ma ono swój efekt tylko dla siły wartości 18. Wyjątkowa siła jest oznaczona warotścią po "/" np. 18/32.
                                    Najniższa wartość to 01 a najwyższa 00 oznaczająca 100.
                                    <br/><br/>
                                    <b>Bazowe wartości głównych atrybutów naturalnie nie ulegają powiększeniu w trakcie gry!</b>
                                    <br/>
                                    Sposoby na pernamentne powiększenie siły w trakci gry:<br/>
                                    Baldur's Gate I: +1 za przeczytanie "Manual of Gainful Exercise"<br/>
                                    Baldur's Gate II Shadows of Amn: +2 za wybór zła podczas Próby Gniewu<br/>
                                    Baldur's Gate II Throne of Bhaal: (tylko dla wojowników) +1 za wybór karty z gwiazdą z Tali Wielu Rzeczy<br/>
                                    Baldur's Gate II Throne of Bhaal: +1 za poprawną obsługę "Machine of Lum the Mad"
                                    <br/><br/>
                                    <a href="https://baldursgate.fandom.com/wiki/Strength">Strength - Baldur's Gate II Wiki</a>
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

export default StrengthDescriptionPopup;
