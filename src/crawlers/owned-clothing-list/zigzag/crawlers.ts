import { IClothing } from "../../../types/interfaces/Clothing.interface";
import {
  fetchZigZagAuthCookieFromEmailAndPassword,
  fetchZigZagOwnedClothingListWithCookie,
} from "./fetchers";

const crawlZigZagOwnedClothingListFromEmailAndPassword = async (
  email: string,
  password: string
): Promise<IClothing[]> => {
  let cookie: string = await fetchZigZagAuthCookieFromEmailAndPassword(
    email,
    password
  );

  let clothingList: IClothing[] = await fetchZigZagOwnedClothingListWithCookie(
    cookie
  );
  return clothingList;
};

export { crawlZigZagOwnedClothingListFromEmailAndPassword };
