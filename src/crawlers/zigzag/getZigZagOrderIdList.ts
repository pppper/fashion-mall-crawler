import axios, { AxiosResponse } from "axios";

export type ZigZagOrderIdListType = string[];
export const getZigZagOrderIdList = (
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
