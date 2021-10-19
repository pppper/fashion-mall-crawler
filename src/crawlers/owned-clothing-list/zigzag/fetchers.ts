import axios, { AxiosResponse } from "axios";
import Exceptions from "../../../types/exceptions";
import { IClothing } from "../../../types/interfaces/Clothing.interface";

const fetchZigZagAuthCookieFromEmailAndPassword = (
  email: string,
  password: string
): Promise<string> => {
  return axios({
    method: "POST",
    url: "https://api.zigzag.kr/api/2/graphql",
    headers: {
      host: "api.zigzag.kr",
      "croquis-client-version": "6.77.0",
      accept: "*/*",
      "apollographql-client-version": "6.77.0-6.77.0.1633685224",
      "croquis-client-time": "1634463352135",
      "accept-language": "en-us",
      "accept-encoding": "gzip, deflate, br",
      "content-type": "application/json",
      "content-length": "258",
      "user-agent": "ZigZag/6.77.0.1633685224 CFNetwork/1312 Darwin/21.0.0",
      connection: "keep-alive",
      "apollographql-client-name": "com.croquis.ZigZag-apollo-ios",
      "x-apollo-operation-name": "Login",
      "x-postman-captr": "3843278",
    },
    data: {
      operationName: "Login",
      query:
        "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    __typename\n    success\n    full_name\n    error_code\n    uuid\n  }\n}",
      variables: {
        input: {
          email,
          password,
        },
      },
    },
  })
    .then((response) => {
      const loginSuccess = (response as AxiosResponse<any>).data?.data?.login
        ?.success;
      const cookie: string = response.headers["set-cookie"][0];

      if (loginSuccess) {
        return cookie;
      } else {
        throw new Exceptions.ZigZagLoginFailedException();
      }
    })
    .catch((error) => {
      throw new Exceptions.ZigZagLoginFailedException({ error });
    });
};

type ZigZagOrderIdListType = string[];
const fetchZigZagOrderIdList = (
  cookie: string
): Promise<ZigZagOrderIdListType> => {
  return axios({
    method: "post",
    url: "https://api.zigzag.kr/api/2/graphql",
    headers: {
      host: "api.zigzag.kr",
      "croquis-client-version": "6.77.0",
      accept: "*/*",
      "apollographql-client-version": "6.77.0-6.77.0.1633685224",
      "croquis-client-time": "1634464015350",
      "if-none-match": 'W/"20-DjEqPDzBRSQZuhiePrme85P3TZ4"',
      "accept-language": "en-us",
      "accept-encoding": "gzip, deflate, br",
      "content-type": "application/json",
      "content-length": "192",
      "user-agent": "ZigZag/6.77.0.1633685224 CFNetwork/1312 Darwin/21.0.0",
      connection: "keep-alive",
      "apollographql-client-name": "com.croquis.ZigZag-apollo-ios",
      cookie,
      "x-apollo-operation-name": "getAllOrderNumber",
      "x-postman-captr": "4694168",
    },
    data: {
      operationName: "getAllOrderNumber",
      query:
        "query getAllOrderNumber {\n  order_list {\n    __typename\n    item_list {\n      __typename\n      order_number\n    }\n  }\n}",
      variables: null,
    },
  }).then((response) => {
    const orderIdList: ZigZagOrderIdListType = (
      response as AxiosResponse<any>
    ).data["data"]["order_list"]["item_list"].map(
      (x: any) => x["order_number"]
    );
    return orderIdList;
  });
};

type ZigZagOrderListType = IZigZagOrder[];
interface IZigZagOrder {
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

const fetchZigZagOrderList = (
  cookie: string,
  orderIdList: ZigZagOrderIdListType
): Promise<ZigZagOrderListType> => {
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
    const orderList: ZigZagOrderListType = (response as AxiosResponse<any>).data
      ?.data?.order_list.item_list;
    return orderList;
  });
};

const extractClothingsInZigZagOrderList = (
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

const fetchZigZagOwnedClothingListWithCookie = async (cookie: string) => {
  const orderIdList: ZigZagOrderIdListType = await fetchZigZagOrderIdList(
    cookie
  );
  const orderList: ZigZagOrderListType = await fetchZigZagOrderList(
    cookie,
    orderIdList
  );
  const clothingList: IClothing[] = await extractClothingsInZigZagOrderList(
    orderList
  );

  return clothingList;
};

export {
  fetchZigZagAuthCookieFromEmailAndPassword,
  fetchZigZagOrderIdList,
  fetchZigZagOrderList,
  fetchZigZagOwnedClothingListWithCookie,
};
