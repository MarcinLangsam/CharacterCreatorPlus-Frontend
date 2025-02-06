import React, { useState } from 'react';

const Thac0DescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Thac0
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                Thac0 (pl. Trak0) - jest to akronim "To Hit Armor Class 0". 
                                Jest miarą szansy na skutecznie trafienie podczas ataku. 
                                Wartość przedstawiona w panelu statystyk to WARTOŚĆ BAZOWA - BONUS STATYSTYK - BONUS KLASOWY
                                <b> Im mniejsza liczba tym lepiej.</b>
                                <br/><br/>
                                Za każdym razem kiedy jakieś stworzenie wyprowadza atak następuje rzut 20 ścienną kością.
                                Wynik 20 jest zawsze skutecznym trafieniem (Trafienie Krytyczne), wynik 1 zawsze traktowany jest jako pudło (Krytyczne Pudło).
                                W innych wypadkach minimalna wartość rzutu uznawana jako trafienie to odjęcie Klasy Pancerza celu od Thac0 atakującego:<br/>
                                Rzut ataku {">="} Thac0 - AC
                                <br/><br/>
                                Wartość Thac0 naturalnie progresuje wraz z wzrostem poziomu postaci. Najszybciej i najlepszą wartości osiągają klasy wojowicze (np. Wojownik, Łowca, Paladyn)
                                W grze jest dostępne mnóstwo przedmitów, zaklęć, mikstór modyfikujących Thac0. Również im większa siła postaci, Thaco0 również jest lepsze.
                                <br/><br/>
                                <a href="https://baldursgate.fandom.com/wiki/THAC0">THAC0 - Baldur's Gate II Wiki</a>
                                </span>

                                <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                    Bazwowa wartośc Thaco0 na dany poziom:
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Poziom</th>
                                                <th>Wojownicy, Mnich</th>
                                                <th>Klerycy</th>
                                                <th>Czarodzieje</th>
                                                <th>Złodzieje</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>1</td><td>20</td><td>20</td><td>20</td><td>20</td></tr>
                                            <tr><td>2</td><td>19</td><td>20</td><td>20</td><td>20</td></tr>
                                            <tr><td>3</td><td>18</td><td>20</td><td>20</td><td>19</td></tr>
                                            <tr><td>4</td><td>17</td><td>18</td><td>19</td><td>19</td></tr>
                                            <tr><td>5</td><td>16</td><td>18</td><td>19</td><td>18</td></tr>
                                            <tr><td>6</td><td>15</td><td>18</td><td>19</td><td>18</td></tr>
                                            <tr><td>7</td><td>14</td><td>16</td><td>18</td><td>17</td></tr>
                                            <tr><td>8</td><td>13</td><td>16</td><td>18</td><td>17</td></tr>
                                            <tr><td>9</td><td>12</td><td>16</td><td>18</td><td>16</td></tr>
                                            <tr><td>10</td><td>11</td><td>14</td><td>17</td><td>16</td></tr>
                                            <tr><td>11</td><td>10</td><td>14</td><td>17</td><td>15</td></tr>
                                            <tr><td>12</td><td>9</td><td>14</td><td>17</td><td>15</td></tr>
                                            <tr><td>13</td><td>8</td><td>12</td><td>16</td><td>14</td></tr>
                                            <tr><td>14</td><td>7</td><td>12</td><td>16</td><td>14</td></tr>
                                            <tr><td>15</td><td>6</td><td>12</td><td>16</td><td>13</td></tr>
                                            <tr><td>16</td><td>5</td><td>10</td><td>15</td><td>13</td></tr>
                                            <tr><td>17</td><td>4</td><td>10</td><td>15</td><td>12</td></tr>
                                            <tr><td>18</td><td>3</td><td>10</td><td>15</td><td>12</td></tr>
                                            <tr><td>19</td><td>2</td><td>8</td><td>14</td><td>11</td></tr>
                                            <tr><td>20</td><td>1</td><td>8</td><td>14</td><td>11</td></tr>
                                            <tr><td>21</td><td>0</td><td>8</td><td>14</td><td>10</td></tr>
                                            <tr><td>≥22</td><td>0</td><td>6</td><td>13</td><td>10</td></tr>
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

export default Thac0DescriptionPopup;
