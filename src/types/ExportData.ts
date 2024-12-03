import { CharacterAttributes } from "./CharacterData";


export interface ExportData {
    //character export data
    name?: string
    gender?: string;
    portrait?: string;
    race?: string;
    classes?: string;
    subclasses?: string;
    character?: string;
    attributes: CharacterAttributes;
    skills: Record<number, number>;
    skillsThief:  Record<number, number>;   
  }