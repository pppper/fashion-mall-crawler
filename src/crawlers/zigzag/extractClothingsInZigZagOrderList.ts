import { IClothing } from "../../types/interfaces/Clothing.interface";
import { IZigZagOrderList } from "./getZigZagOrderList";

export const extractClothingsInZigZagOrderList = (
  zigZagOrderList: IZigZagOrderList
): IClothing[] => {
  let clothings: IClothing[] = [];

  for (let orderShop of zigZagOrderList.order_shop_list) {
    for (let orderItem of orderShop.order_item_list) {
      let productInfo = orderItem.product_info;
      clothings.push({
        productUrl: productInfo.url,
        imageUrl: productInfo.image_url,
        options: productInfo.options,
      });
    }
  }

  return clothings;
};
