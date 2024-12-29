import React from "react";
import { useExportDataContext } from "../context/ExportDataContext";
import { useCharacterContext } from "../context/CharacterContext";


const racialEnemyData = {
    Obserwator: "0x123",
    DemonyUpadli: "0x121",
    Smok: "0x146",
    Żywiołak: "0x145",
    Ettercap: "0x107",
    IstotyBaśniowe: "0x120",
    Geniusz: "0x147",
    Ghul: "0x108",
    Golem: "0x144",
    Hobgoblin: "0x111",
    Chochlik: "0x109",
    Koblod: "0x112",
    KuoToa: "0x135",
    Lisz: "0x150",
    Likantrop: "0x122",
    Mefit: "0x139",
    ŁupieżcaUmysłu: "0x124",
    Ogr: "0x113",
    Otaig: "0x127",
    Rakshasa: "0x128",
    Sahuagin: "0x131",
    Cień: "0x132",
    Szlam: "0x119",
    Pająk: "0x116",
    Trol: "0x129",
    UmbrowyKolos: "0x130",
    Wampir: "0x125",
    Ork: "0x143",
  }
  

const RacialEnemeyMenu: React.FC = () => {
    const { characterData, setCharacterData } = useCharacterContext();
      const { exportData, setExportData } = useExportDataContext();
      const selectedSubclass = characterData.subclasses;
      

    const setRacialEenemy = (racialEnemeyName: string, hexValue: string) => {
        setCharacterData((prev) => ({
          ...prev,
          racialEnemy: racialEnemeyName.toString()
        }));
    
        setExportData((prev) => ({
          ...prev,
          racialEnemy: hexValue
        }));
      }

    return(
        <>
            <div className="proficiencysBackground">
              <p className="plainTextBig">Wybierz wroga rasowego:</p>
              {selectedSubclass ? (
                <div>
                  {Object.entries(racialEnemyData)
                  .map(([racialEnemy, value]) => (
                    <div key={racialEnemy}>
                      <button className="tertiaryText" onClick={() => setRacialEenemy(racialEnemy,value)}>{racialEnemy}</button>
                    </div>
                  ))}
                </div>
            ) : (
              <></>
            )}
            </div>
        </>
    )
}

export default RacialEnemeyMenu;