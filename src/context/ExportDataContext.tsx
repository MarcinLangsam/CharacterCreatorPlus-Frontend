import { createContext, useContext, useState } from "react";
import { ExportData } from "../types/ExportData";
import { CharacterAttributes, ThievingAbilities, WeaponProficiencys } from "../types/CharacterData";

interface ExportDataContextType {
    exportData: ExportData;
    setExportData: React.Dispatch<React.SetStateAction<ExportData>>;
}

const defaultProficiencys: WeaponProficiencys = {
    MieczePoltorareczne: -1,
    MieczeDlugie: -1,
    MieczeKrotkie: -1,
    Topory: -1,
    MieczeObureczne: -1,
    Katany: -1,
    SejmitarWakizashiNinjaTo: -1,
    Sztylety: -1,
    MlotyBojowe: -1,
    Maczugi: -1,
    Wlocznie: -1,
    Halabarda: -1,
    CepyBojoweMorgernszterny: -1,
    Wiekiery: -1,
    Kije: -1,
    Kusze: -1,
    DlugieLuki: -1,
    KrotkieLuki: -1,
    Strzalki: -1,
    Proce: -1,
    StylWalkiBroniaDwureczna: -1,
    StylWalkiMieczemITarcza: -1,
    StylWalkiJednaBronia: -1,
    StylWalkiDwiemaBronmi: -1,
  
  };
  
  export const defaultThievingAbilities: ThievingAbilities = {
    Otwieranie_Zamkow: -1,
    Kradziez_Kieszonkowa: -1,
    Ciche_Poruszanie: -1,
    Krycie_W_Cieniu: -1,
    Znajdywanie_Pulapek: -1,
    Wykrywanie_Iluzji: -1,
    Rozstawianie_Pulapek: -1,
  };
  
  
  const defaultAttributes: CharacterAttributes = {
    strength: 0,
    strenghtModifier : 0,
    agility: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };

const defaultExportData: ExportData = {
  attributes: defaultAttributes,
  skills: defaultProficiencys,
  skillsThief: defaultThievingAbilities,
  name: [],
  gender: "",
  portrait: [],
  race: "",
  classes: "",
  subclasses: "",
  character: "",
  racialEnemy: ""
};
  

const ExportDataContext = createContext<ExportDataContextType | undefined>(undefined);

export const ExportDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [exportData, setExportData] = useState<ExportData>(defaultExportData);

    return (
        <ExportDataContext.Provider value={{ exportData, setExportData }}>
            {children}
        </ExportDataContext.Provider>
    );
};

export const useExportDataContext = (): ExportDataContextType => {
    const context = useContext(ExportDataContext);
    if(!context) {
        throw new Error("useExportDataContext must be used within a ExportDataProvider");
    }
    return context;
}