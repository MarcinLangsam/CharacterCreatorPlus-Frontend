import React, { useState } from 'react';

const BashingDescriptionPopup: React.FC  = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return(
        <>
            <div style={{ display: "inline", backgroundColor: "rgb(30, 30, 30)" }}>
                <a onClick={openPopup} className='popup-description'>
                    Wyważanie zamków
                </a>

                {isOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className='d-flex flex-row' style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                <span>
                                    Wyważanie zamków (ang. Bashing) - poswala siłą otworzyć wybrany zamek przez daną postać poza umiejętnością otwierania zamków.
                                    Podczas wyważania zamków następuje rzut 8-ścienną kością, ten wynik plus wyważanie określa czy zamek uda się wyważyć. Każdy zamek ma okreslony próg, który należy spełnić aby skutecznie go wyważyć.
                                    <br/><br/>
                                    UWAGA: W porównaniu do otwierania zamków z umiejętności złodziejskich, wyważanie NIE zapewnia punktów doświadczenia. 
                                <br/><br/>
                                <a href="https://baldursgate.fandom.com/wiki/Strength#Bashing">Bashing - Baldur's Gate II Wiki</a>
                                </span>

                                <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Siła</th>
                                                <th>Wyważanie Zamków</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>1</td><td>1</td></tr>
                                            <tr><td>2</td><td>2</td></tr>
                                            <tr><td>4</td><td>3</td></tr>
                                            <tr><td>5</td><td>6</td></tr>
                                            <tr><td>6</td><td>6</td></tr>
                                            <tr><td>7</td><td>7</td></tr>
                                            <tr><td>8</td><td>8</td></tr>
                                            <tr><td>9</td><td>9</td></tr>
                                            <tr><td>10</td><td>10</td></tr>
                                            <tr><td>11</td><td>11</td></tr>
                                            <tr><td>12</td><td>12</td></tr>
                                            <tr><td>13</td><td>13</td></tr>
                                            <tr><td>14</td><td>14</td></tr>
                                            <tr><td>15</td><td>15</td></tr>
                                        </tbody>
                                    </table>
                                 </div>

                                <div style={{ backgroundColor: "rgb(30, 30, 30)"}}>
                                    <table>
                                            <thead>
                                                <tr>
                                                    <th>Siła</th>
                                                    <th>Wyważanie Zamków</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>16</td><td>16</td></tr>
                                                <tr><td>17</td><td>18</td></tr>
                                                <tr><td>18</td><td>20</td></tr>
                                                <tr><td>18/01 - 18/50</td><td>25</td></tr>
                                                <tr><td>18/51 - 18/75</td><td>30</td></tr>
                                                <tr><td>18/76 - 18/90</td><td>35</td></tr>
                                                <tr><td>18/91 - 18/99</td><td>40</td></tr>
                                                <tr><td>18/00</td><td>45</td></tr>
                                                <tr><td>19</td><td>50</td></tr>
                                                <tr><td>20</td><td>55</td></tr>
                                                <tr><td>21</td><td>60</td></tr>
                                                <tr><td>22</td><td>65</td></tr>
                                                <tr><td>23</td><td>70</td></tr>
                                                <tr><td>24</td><td>75</td></tr>
                                                <tr><td>25</td><td>80</td></tr>
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

export default BashingDescriptionPopup;
