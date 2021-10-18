import { IClothingListCrawler } from "../../types/interfaces/ClothingListCrawler.interface";
import { getZigZagOwnedClothingList } from "./getZigZagOwnedClothingList";

export class ZigZagOwnedClothingListCrawler implements IClothingListCrawler {
  getOwnedClothingList = getZigZagOwnedClothingList;
}
