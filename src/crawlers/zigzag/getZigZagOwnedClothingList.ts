import { IClothing } from "../../types/interfaces/Clothing.interface";
import { extractClothingsInZigZagOrderList } from "./extractClothingsInZigZagOrderList";
import { getZigZagAuthCookieFromEmailAndPassword } from "./getZigZagAuthCookie";
import {
  getZigZagOrderIdList,
  ZigZagOrderIdListType,
} from "./getZigZagOrderIdList";

import { getZigZagOrderList, ZigZagOrderListType } from "./getZigZagOrderList";

const getZigZagOwnedClothingListWithCookie = async (cookie: string) => {
  const orderIdList: ZigZagOrderIdListType = await getZigZagOrderIdList(cookie);
  const orderList: ZigZagOrderListType = await getZigZagOrderList(
    cookie,
    orderIdList
  );
  const clothingList: IClothing[] = await extractClothingsInZigZagOrderList(
    orderList
  );

  return clothingList;
};

export const getZigZagOwnedClothingListFromEmailAndPassword = async (
  email: string,
  password: string
): Promise<IClothing[]> => {
  let cookie: string = await getZigZagAuthCookieFromEmailAndPassword(
    email,
    password
  );

  let clothingList: IClothing[] = await getZigZagOwnedClothingListWithCookie(
    cookie
  );
  return clothingList;
};
