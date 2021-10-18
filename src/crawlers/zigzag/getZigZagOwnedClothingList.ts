import {
  ZigZagAuthenticationCredentials,
  ZigZagAuthenticationStrategyEnum,
} from "../../types/interfaces/AuthenticationCredentials.interface";
import { IClothing } from "../../types/interfaces/Clothing.interface";
import { extractClothingsInZigZagOrderList } from "./extractClothingsInZigZagOrderList";
import { getZigZagAuthCookieFromEmailAndPassword } from "./getZigZagAuthCookie";
import {
  getZigZagOrderIdList,
  ZigZagOrderIdListType,
} from "./getZigZagOrderIdList";
import { getZigZagOrderList, IZigZagOrderList } from "./getZigZagOrderList";

export const getZigZagOwnedClothingList = async (
  authenticationCredentials: ZigZagAuthenticationCredentials
): Promise<IClothing[]> => {
  let cookie: string;
  switch (authenticationCredentials.strategy) {
    case ZigZagAuthenticationStrategyEnum.USE_EMAIL_AND_PASSWORD:
      cookie = await getZigZagAuthCookieFromEmailAndPassword(
        authenticationCredentials.email,
        authenticationCredentials.password
      );
  }

  const orderIdList: ZigZagOrderIdListType = await getZigZagOrderIdList(cookie);
  const orderList: IZigZagOrderList = await getZigZagOrderList(
    cookie,
    orderIdList
  );
  const clothingList: IClothing[] = await extractClothingsInZigZagOrderList(
    orderList
  );

  return clothingList;
};
