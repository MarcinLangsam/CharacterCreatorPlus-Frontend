import React, { useState } from 'react';

interface PopUpProps {
    name: string;
    level: number;
    schcool: string;
    iconData: string;
}

const BhaalDescriptionPopup: React.FC<PopUpProps>  = ({name, schcool, level, iconData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div>
                <button onClick={openPopup} className="standard-button">
                    <img 
                        src={`http://localhost:3000/BhaalspawnAbilities/BhaalspawnAbilitiesIcons/${iconData}`}
                        alt="Bhaalspawn Abiliti Icon"
                        style={{maxWidth: "50px", maxHeight: "50px"}}    
                    />
                </button>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <img 
                            src={`http://localhost:3000/BhaalspawnAbilities/BhaalspawnAbilitiesIcons/${iconData}`}
                            alt="Bhaalspawn Abiliti Icon"
                            style={{maxWidth: "50px", maxHeight: "50px"}}    
                            />
                            <span>
                                {name}<br/>
                                Szkoła Magi: {schcool}<br/>
                                Poziom zaklęcia: {level}<br/>
                            </span>
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

export default BhaalDescriptionPopup;
