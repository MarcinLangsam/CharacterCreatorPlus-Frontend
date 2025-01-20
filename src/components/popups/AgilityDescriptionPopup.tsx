import React, { useState } from 'react';

const AgilityDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Zręczność
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Zręczność (ang. Dexterity) - cecha ta określa zdolność posługiwania się bronią dystanową, umiejętności obronne postaci oraz biegłość w sztukach złodziejskich.
                                    Jest najważniejszą cechą złodzieji gdzie wartość przynajmniej 15 do 17 są wymagane aby wykorzystać dwuklasowość w klasy złodzieji bądź łowców.<br/>
                                    Zręczność wpływa bezpośrednio na:<br/>
                                    <b>Thaco0 (bronie dystansowe), KP, Umiejętności Złodziejskie</b>
                                    <br/><br/>
                                    *Zręczność wpływa też na ukrytą statystykę reakcji ale nie ma ona żadnego zastowania w grze.
                                    <br/><br/>
                                    <b>Bazowe wartości głównych atrybutów naturalnie nie ulegają powiększeniu w trakcie gry!</b>
                                    <br/>
                                    Sposoby na pernamentne powiększenie zręczności w trakci gry:<br/>
                                    Baldur's Gate I: +1 za przeczytanie "Manual of Quickness of Action"<br/>
                                    Baldur's Gate II Throne of Bhaal: (tylko dla złodzieji/bardów) +1 za wybór karty z gwiazdą z Tali Wielu Rzeczy<br/>
                                    Baldur's Gate II Throne of Bhaal: +1 za poprawną obsługę "Machine of Lum the Mad"
                                    <br/><br/>
                                    <a href="https://baldursgate.fandom.com/wiki/Dexterity">Dexterity - Baldur's Gate II Wiki</a>
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

export default AgilityDescriptionPopup;
