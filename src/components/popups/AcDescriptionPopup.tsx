import React, { useState } from 'react';

const AcDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Klasa Pancerza
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                Klasa Pancerza, KP (ang. Armor Class, AC) - reprezetuje umiejętności unikania, blokowania oraz parowania fizycznych ataków przez postać. 
                                Klasa Pancerza NIE redukuje otrzymanych obrażeń, sprawia, że postać jest trudniejsza do trafienia.<br/>
                                Wzór na skuteczne uniknięcie ciosu wygląda następująco:<br/>
                                Klasa pancerza {"<"} Thaco0 - Rrzut Ataku
                                <br/><br/>
                                W grze występują 4 typy fizycznych obrażeń: <b>Cięte, Kłute, Obuchowe, Pociski</b><br/>
                                Typ obrażeń zależny jest od używanje broni. Podawana tutaj wartość jest prawdziwa dla wszystkich typów obrażeń fizycznych 
                                ale w grze można napotakć dodatkowe modyfikatory tylko dla wybranych typów np. tarcze dodatkowo polepsząją KP tylko na pociski.
                                <br/><br/>
                                W grze KP jest modyfikowane głównie przez przedmioty i zaklęcia. Statystyka zręczności również wpływa na bazową wartość KP.
                                <br/><br/>
                                <a href="https://baldursgate.fandom.com/wiki/Armor_Class">Armor Class - Baldur's Gate II Wiki</a>
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

export default AcDescriptionPopup;
