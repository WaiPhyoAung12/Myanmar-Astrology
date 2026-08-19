export type MahaboteHouseKey = 'binga' | 'atuna' | 'yaza' | 'adhipati' | 'marana' | 'thike' | 'puti'

export type MahaboteHouseName = 'ဘင်္ဂ' | 'အထွန်း' | 'ရာဇ' | 'အဓိပတိ' | 'မရဏ' | 'သိုက်' | 'ပုတိ'

export interface MahaboteResult {
  myanmarYear: number
  remainder: number
  houseKey: MahaboteHouseKey
  houseName: MahaboteHouseName
}
