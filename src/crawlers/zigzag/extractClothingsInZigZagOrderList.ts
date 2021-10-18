import { IClothing } from "../../types/interfaces/Clothing.interface";
import { ZigZagOrderListType } from "./getZigZagOrderList";

export const extractClothingsInZigZagOrderList = (
  zigZagOrderList: ZigZagOrderListType
): IClothing[] => {
  let clothings: IClothing[] = [];
  for (let order of zigZagOrderList) {
    for (let orderShop of order.order_shop_list) {
      for (let orderItem of orderShop.order_item_list) {
        let productInfo = orderItem.product_info;
        clothings.push({
          productUrl: productInfo.url,
          imageUrl: productInfo.image_url,
          options: productInfo.options,
        });
      }
    }
  }

  return clothings;
};
