import axios, { AxiosResponse } from "axios";
import { ZigZagOrderIdListType } from "./getZigZagOrderIdList";

export interface IZigZagOrderList {
  __typename: string;
  order_number: string;
  date_created: number;
  order_shop_list: IZigZagOrderShopList[];
}

interface IZigZagOrderShopList {
  __typename: string;
  shop_main_domain: string;
  order_item_list: IZigZagOrderItemList[];
}

interface IZigZagOrderItemList {
  __typename: string;
  order_item_number: string;
  status: string;
  recent_reject_request: null;
  shipping_company: null;
  invoice_number: null;
  product_info: IZigZagProductInfo;
  is_zonly: boolean;
}

interface IZigZagProductInfo {
  __typename: string;
  name: string;
  url: string;
  image_url: string;
  options: string;
}

export const getZigZagOrderList = (
  cookie: string,
  orderIdList: ZigZagOrderIdListType
): Promise<IZigZagOrderList> => {
  return axios({
    method: "post",
    url: "https://api.zigzag.kr/api/2/graphql",
    headers: {
      host: "api.zigzag.kr",
      "croquis-client-version": "6.77.0",
      accept: "*/*",
      "apollographql-client-version": "6.77.0-6.77.0.1633685224",
      "croquis-client-time": "1634465135801",
      "if-none-match": 'W/"2c-+UV1HI9wJ559IVHN2RjYuoMCLpA"',
      "accept-language": "en-us",
      "accept-encoding": "gzip, deflate, br",
      "content-type": "application/json",
      "content-length": "781",
      "user-agent": "ZigZag/6.77.0.1633685224 CFNetwork/1312 Darwin/21.0.0",
      connection: "keep-alive",
      "apollographql-client-name": "com.croquis.ZigZag-apollo-ios",
      cookie,
      "x-apollo-operation-name": "getOrderList",
      "x-postman-captr": "724359",
    },
    data: {
      operationName: "getOrderList",
      query:
        "query getOrderList($order_number_list: [String!]) {\n  order_list(order_number_list: $order_number_list) {\n    __typename\n    item_list {\n      __typename\n      ...APIOrder\n    }\n  }\n}fragment APIOrder on Order {\n  __typename\n  order_number\n  date_created\n  order_shop_list {\n    __typename\n    shop_main_domain\n    order_item_list {\n      __typename\n      ...APIOrderItem\n    }\n  }\n}fragment APIOrderItem on OrderItem {\n  __typename\n  order_item_number\n  status\n  recent_reject_request {\n    __typename\n    type\n  }\n  shipping_company\n  invoice_number\n  product_info {\n    __typename\n    name\n    url\n    image_url\n    options\n  }\n  is_zonly\n}",
      variables: {
        order_number_list: orderIdList,
      },
    },
  }).then((response) => {
    const orderList: IZigZagOrderList = (response as AxiosResponse<any>).data
      ?.data?.order_list.item_list;
    return orderList;
  });
};
