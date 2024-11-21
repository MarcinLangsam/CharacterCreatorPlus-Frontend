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
  2: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  3: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  4: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  5: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  6: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  7: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  8: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  9: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  10: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  11: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  12: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  13: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  14: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  15: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  16: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  17: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  18: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
  19: { rangedThac0: 6, AC: 5, Kradzież_KieszonkowaBonus: -15, Otwieranie_ZamkówBonus: -10, Znajdywanie_PułapekBonus: -10, Ciche_PoruszanieBonus: -20, Krycie_W_CieniuBonus: -10, Rozstawianie_Pułapek: -10, },
};