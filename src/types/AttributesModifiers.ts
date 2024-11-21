const strengthModifiers: Record<
  number, 
  { melleThac0: number; dmgBonus: number; bashing: number; weight: number; }
> = {
  1: { melleThac0: 5, dmgBonus: -4, bashing: 1, weight: 1 },
  2: { melleThac0: 3, dmgBonus: -2, bashing: 2, weight: 3 },
  3: { melleThac0: 3, dmgBonus: -1, bashing: 3, weight: 5 },
  4: { melleThac0: 2, dmgBonus: -1, bashing: 4, weight: 15 },
  5: { melleThac0: 2, dmgBonus: -1, bashing: 5, weight: 15 },
  6: { melleThac0: 1, dmgBonus: 0, bashing: 6, weight: 30 },
  7: { melleThac0: 1, dmgBonus: 0, bashing: 7, weight: 30 },
  8: { melleThac0: 0, dmgBonus: 0, bashing: 8, weight: 50 },
  9: { melleThac0: 0, dmgBonus: 0, bashing: 9, weight: 50 },
  10: { melleThac0: 0, dmgBonus: 0, bashing: 10, weight: 70 },
  11: { melleThac0: 0, dmgBonus: 0, bashing: 11, weight: 70 },
  12: { melleThac0: 0, dmgBonus: 0, bashing: 12, weight: 90 },
  13: { melleThac0: 0, dmgBonus: 0, bashing: 13, weight: 90 },
  14: { melleThac0: 0, dmgBonus: 0, bashing: 14, weight: 120 },
  15: { melleThac0: 0, dmgBonus: 0, bashing: 15, weight: 120 },
  16: { melleThac0: 0, dmgBonus: 1, bashing: 16, weight: 150 },
  17: { melleThac0: -1, dmgBonus: 1, bashing: 18, weight: 170 },
  18: { melleThac0: -1, dmgBonus: 2, bashing: 20, weight: 200 },
  19: { melleThac0: -3, dmgBonus: 7, bashing: 50, weight: 500 },
};

const agilityModifiers: Record<
  number, 
  { rangedThac0: number; AC: number; Kradzież_KieszonkowaBonus: number; Otwieranie_ZamkówBonus: number; Znajdywanie_PułapekBonus: number; Ciche_PoruszanieBonus: number; Krycie_W_CieniuBonus: number; Rozstawianie_Pułapek: number; }
> = {
  1: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  2: { rangedThac0: 4, AC: 4, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  3: { rangedThac0: 3, AC: 3, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  4: { rangedThac0: 2, AC: 2, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  5: { rangedThac0: 1, AC: 1, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  6: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  7: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  8: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  9: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  10: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: -10, Otwieranie_ZamkówBonus: -5, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -15, Krycie_W_CieniuBonus: -5, Rozstawianie_Pułapek: -10, },
  11: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: -5, Otwieranie_ZamkówBonus: 0, Znajdywanie_PułapekBonus: -5, Ciche_PoruszanieBonus: -10, Krycie_W_CieniuBonus: 0, Rozstawianie_Pułapek: -5, },
  12: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: 0, Otwieranie_ZamkówBonus: 0, Znajdywanie_PułapekBonus: 0, Ciche_PoruszanieBonus: -5, Krycie_W_CieniuBonus: 0, Rozstawianie_Pułapek: 0, },
  13: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: 0, Otwieranie_ZamkówBonus: 0, Znajdywanie_PułapekBonus: 0, Ciche_PoruszanieBonus: 0, Krycie_W_CieniuBonus: 0, Rozstawianie_Pułapek: 0, },
  14: { rangedThac0: 0, AC: 0, Kradzież_KieszonkowaBonus: 0, Otwieranie_ZamkówBonus: 0, Znajdywanie_PułapekBonus: 0, Ciche_PoruszanieBonus: 0, Krycie_W_CieniuBonus: 0, Rozstawianie_Pułapek: 0, },
  15: { rangedThac0: 0, AC: -1, Kradzież_KieszonkowaBonus: 0, Otwieranie_ZamkówBonus: 0, Znajdywanie_PułapekBonus: 0, Ciche_PoruszanieBonus: 0, Krycie_W_CieniuBonus: 0, Rozstawianie_Pułapek: 0, },
  16: { rangedThac0: -1, AC: -2, Kradzież_KieszonkowaBonus: 0, Otwieranie_ZamkówBonus: 5, Znajdywanie_PułapekBonus: 0, Ciche_PoruszanieBonus: 0, Krycie_W_CieniuBonus: 0, Rozstawianie_Pułapek: 0, },
  17: { rangedThac0: -2, AC: -3, Kradzież_KieszonkowaBonus: 5, Otwieranie_ZamkówBonus: 10, Znajdywanie_PułapekBonus: 0, Ciche_PoruszanieBonus: 5, Krycie_W_CieniuBonus: 5, Rozstawianie_Pułapek: 0, },
  18: { rangedThac0: -2, AC: -4, Kradzież_KieszonkowaBonus: 10, Otwieranie_ZamkówBonus: 15, Znajdywanie_PułapekBonus: 5, Ciche_PoruszanieBonus: 10, Krycie_W_CieniuBonus: 10, Rozstawianie_Pułapek: 5, },
  19: { rangedThac0: -3, AC: -4, Kradzież_KieszonkowaBonus: 15, Otwieranie_ZamkówBonus: 20, Znajdywanie_PułapekBonus: 10, Ciche_PoruszanieBonus: 15, Krycie_W_CieniuBonus: 15, Rozstawianie_Pułapek: 10, },
}

const constitutionModifiers: Record<
  number, 
  { HPperLvBonus: number; IntoxicationPerDrink: number; fatigue: number;}
> = {
  1: { HPperLvBonus: -3, IntoxicationPerDrink: 100, fatigue: 4},
  2: { HPperLvBonus: -2, IntoxicationPerDrink: 88, fatigue: 3},
  3: { HPperLvBonus: -2, IntoxicationPerDrink: 66, fatigue: 3},
  4: { HPperLvBonus: -1, IntoxicationPerDrink: 50, fatigue: 2},
  5: { HPperLvBonus: -1, IntoxicationPerDrink: 40, fatigue: 2},
  6: { HPperLvBonus: -1, IntoxicationPerDrink: 30, fatigue: 1},
  7: { HPperLvBonus: 0, IntoxicationPerDrink: 20, fatigue: 1},
  8: { HPperLvBonus: 0, IntoxicationPerDrink: 15, fatigue: 0},
  9: { HPperLvBonus: 0, IntoxicationPerDrink: 13, fatigue: 0},
  10: { HPperLvBonus: 0, IntoxicationPerDrink: 13, fatigue: 0},
  11: { HPperLvBonus: 0, IntoxicationPerDrink: 13, fatigue: 0},
  12: { HPperLvBonus: 0, IntoxicationPerDrink: 13, fatigue: 0},
  13: { HPperLvBonus: 0, IntoxicationPerDrink: 12, fatigue: 0},
  14: { HPperLvBonus: 0, IntoxicationPerDrink: 11, fatigue: 0},
  15: { HPperLvBonus: 1, IntoxicationPerDrink: 10, fatigue: 0},
  16: { HPperLvBonus: 2, IntoxicationPerDrink: 9, fatigue: -1},
  17: { HPperLvBonus: 3, IntoxicationPerDrink: 8, fatigue: -1},
  18: { HPperLvBonus: 4, IntoxicationPerDrink: 7, fatigue: -2},
  19: { HPperLvBonus: 5, IntoxicationPerDrink: 5, fatigue: -2},
}

const inteligenceModifiers: Record<
  number, 
  { INTmaxSpellLevel: number; INTspellPerLevel: number; scribeSuccessRate: number; INTlore: number;}
> = {
  1: { INTmaxSpellLevel: 0, INTspellPerLevel: 0, scribeSuccessRate: 0, INTlore: -20},
  2: { INTmaxSpellLevel: 0, INTspellPerLevel: 0, scribeSuccessRate: 0, INTlore: -20},
  3: { INTmaxSpellLevel: 0, INTspellPerLevel: 0, scribeSuccessRate: 0, INTlore: -20},
  4: { INTmaxSpellLevel: 0, INTspellPerLevel: 0, scribeSuccessRate: 0, INTlore: -20},
  5: { INTmaxSpellLevel: 0, INTspellPerLevel: 0, scribeSuccessRate: 0, INTlore: -20},
  6: { INTmaxSpellLevel: 0, INTspellPerLevel: 0, scribeSuccessRate: 0, INTlore: -20},
  7: { INTmaxSpellLevel: 0, INTspellPerLevel: 0, scribeSuccessRate: 0, INTlore: -10},
  8: { INTmaxSpellLevel: 0, INTspellPerLevel: 0, scribeSuccessRate: 0, INTlore: -10},
  9: { INTmaxSpellLevel: 4, INTspellPerLevel: 6, scribeSuccessRate: 35, INTlore: -10},
  10: { INTmaxSpellLevel: 5, INTspellPerLevel: 7, scribeSuccessRate: 40, INTlore: 0},
  11: { INTmaxSpellLevel: 5, INTspellPerLevel: 7, scribeSuccessRate: 45, INTlore: 0},
  12: { INTmaxSpellLevel: 6, INTspellPerLevel: 7, scribeSuccessRate: 50, INTlore: 0},
  13: { INTmaxSpellLevel: 6, INTspellPerLevel: 9, scribeSuccessRate: 55, INTlore: 0},
  14: { INTmaxSpellLevel: 7, INTspellPerLevel: 9, scribeSuccessRate: 60, INTlore: 0},
  15: { INTmaxSpellLevel: 7, INTspellPerLevel: 11, scribeSuccessRate: 65, INTlore: 3},
  16: { INTmaxSpellLevel: 8, INTspellPerLevel: 11, scribeSuccessRate: 70, INTlore: 5},
  17: { INTmaxSpellLevel: 8, INTspellPerLevel: 14, scribeSuccessRate: 75, INTlore: 7},
  18: { INTmaxSpellLevel: 9, INTspellPerLevel: 18, scribeSuccessRate: 85, INTlore: 10},
  19: { INTmaxSpellLevel: 9, INTspellPerLevel: 99, scribeSuccessRate: 95, INTlore: 12},
}

const wisdomModifiers: Record<
  number, 
  { extraSpellSlotlv1: number; extraSpellSlotlv2: number; extraSpellSlotlv3: number; extraSpellSlotlv4: number; WISlore: number;}
> = {
  1: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -20},
  2: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -20},
  3: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -20},
  4: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -20},
  5: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -20},
  6: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -20},
  7: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -10},
  8: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -10},
  9: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: -10},
  10: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: 0},
  11: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: 0},
  12: { extraSpellSlotlv1: 0, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: 0},
  13: { extraSpellSlotlv1: 1, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: 0},
  14: { extraSpellSlotlv1: 2, extraSpellSlotlv2: 0, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: 0},
  15: { extraSpellSlotlv1: 2, extraSpellSlotlv2: 1, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: 3},
  16: { extraSpellSlotlv1: 2, extraSpellSlotlv2: 2, extraSpellSlotlv3: 0, extraSpellSlotlv4: 0, WISlore: 5},
  17: { extraSpellSlotlv1: 2, extraSpellSlotlv2: 2, extraSpellSlotlv3: 1, extraSpellSlotlv4: 0, WISlore: 7},
  18: { extraSpellSlotlv1: 2, extraSpellSlotlv2: 2, extraSpellSlotlv3: 1, extraSpellSlotlv4: 1, WISlore: 10},
  19: { extraSpellSlotlv1: 3, extraSpellSlotlv2: 2, extraSpellSlotlv3: 1, extraSpellSlotlv4: 2, WISlore: 12},
}

const charismaModifiers: Record<
  number, 
  { reaction: number; buyDiscount: number;}
> = {
  1: { reaction: -10, buyDiscount: 0},
  2: { reaction: -9, buyDiscount: 0},
  3: { reaction: -8, buyDiscount: 0},
  4: { reaction: -7, buyDiscount: 0},
  5: { reaction: -6, buyDiscount: 0},
  6: { reaction: -5, buyDiscount: 0},
  7: { reaction: -4, buyDiscount: 0},
  8: { reaction: -2, buyDiscount: 0},
  9: { reaction: -1, buyDiscount: 0},
  10: { reaction: 0, buyDiscount: 0},
  11: { reaction: 0, buyDiscount: 0},
  12: { reaction: 0, buyDiscount: 0},
  13: { reaction: 1, buyDiscount: 0},
  14: { reaction: 2, buyDiscount: 0},
  15: { reaction: 3, buyDiscount: 0},
  16: { reaction: 4, buyDiscount: -5},
  17: { reaction: 4, buyDiscount: -10},
  18: { reaction: 5, buyDiscount: -15},
  19: { reaction: 8, buyDiscount: -20},
}