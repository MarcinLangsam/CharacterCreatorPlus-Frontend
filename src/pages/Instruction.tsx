import React from "react";
import WizardDescriptionPopup from "../components/popups/WizardDescriptionPopup c copy";
import InstructionPopup from "../components/popups/InstructionPopup";
import Thac0DescriptionPopup from "../components/popups/Thac0DescriptionPopup";

const InstructionPage: React.FC = () => {
    return(
        <>
            <div style={{ margin: "20px" }}>
                <h1 className="primary-text" style={{ textAlign: "left" }}>1. Podstrony</h1>
                <p style={{ fontSize: "1.4rem", margin: "20px" }}>
                    MENU POSTACI - z tego menu możesz zarządzać swoimi postaciami, wyświetla ona stworzone przez ciebie
                    postacie i pozwala nimi zarządać, między innymi pobrać ich pliki ponowanie oraz je edytować. Przez "+" w elmecie "Stwórz Nową Postać"
                    możesz przejśc do ekranu tworzenia postaci.
                    <br/>
                    TWORZENIE POSTACI - w tym menu dokonuje się tworzenia nowej postaci od zera. 
                    Ukończone postacie będą zapisywane w Menu Postaci. 
                    Tworząc postać podąrzaj kategoriami od lewej do prawej według podawanych instrukcji
                </p>

                <h1 className="primary-text" style={{ textAlign: "left" }}>2. Elementy interaktywne</h1>
                <p style={{ fontSize: "1.4rem", margin: "20px" }}>
                    Przyciski tego typu <button className="standard-button">Przykładowy przycisk</button> jest elementem interaktywnym.<br/>
                    Tyczy się to też przycisków z ikonami <WizardDescriptionPopup name={"Przykładowe zaklęcie"} level={0} schcool={"Przykładowy opis zaklęcia"} iconData={"SPWI102.png"} /><br/>
                    Przyciski z symbolem <button className="standard-button">?</button> zwykle prowadzą do okna z dodatkowymi informacjami z, którch warto skorzystać.<br/>
                    Teksty oznaczone takim stylem <InstructionPopup/> prowadzą do okna tłumaczącego opisane zagadnienie, hasło bądź mechanikę np. <Thac0DescriptionPopup/>
                </p >

                <h1 className="primary-text" style={{ textAlign: "left" }}>3. Jak zainportować stworzoną postać?</h1>
                <p style={{ fontSize: "1.4rem", margin: "20px" }}>
                    Po utworzeniu postaci na ekranie podsumowania bądź z ekranu Menu Postaci można pobrać plik wybranej postaci (IMIĘ_POSTACI.chr).
                    Ten plik należy umieścić w plikach gry. Domyślnie są to C:\Users\NAZWA_UŻYTKOWNIKA\Documents\Baldur's Gate II - Enhanced Edition\characters.
                    Po uruchomienu gry będzie można wybrać stworzoną postać w menu "Import z pliku".
                </p>

                <h1 className="primary-text" style={{ textAlign: "left" }}>4. Jak dodać własny portret do gry?</h1>
                <p style={{ fontSize: "1.4rem", margin: "20px" }}>
                    Jeśli zdecydujesz się dodać własny portret postaci musisz plik wybierany podczasz tworzenia umieścić w C:\Users\NAZWA_UŻYTKOWNIKA\Documents\Baldur's Gate II - Enhanced Edition\portraits.
                    Nie przejmuj się jeśli nie zrobisz tego odrazu, plik portretu można dodać w dowonlnym momencie.
                    Można rozpocząć grę dana postacią pomimo braku pliku z portretem.<br/>
                    Zasady dodawnia portertu:<br/>
                    <ol>
                        <li>Nazwa pliku nie może być dłuższa niż 8 znaków</li>
                        <li>Plik musi być w formacie .bmp</li>
                        <li>Plik musi mieć 24bit-ową głębię kolorów</li>
                        <li>Rozdzielczość jest dowolna do 1024px ale najlepiej aby była minimum 169x266px, dodatkowo być w proporcjach wysokość:szerokość 1.5:1 aby nie był zniekształcony</li>
                        <li>Plik z portretem musi się znajdować w folderze gry w dokumentach z portretami (/Documents/Baldur's Gate - Enhanced Edition/Portraits)</li>
                    </ol>
                </p>
            </div>
        </>
    )
}

export default InstructionPage;