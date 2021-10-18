import { IClothing } from "./Clothing.interface";

export interface IClothingListCrawler {
  getOwnedClothingList: (
    email: string,
    password: string
  ) => Promise<IClothing[]>;
}
