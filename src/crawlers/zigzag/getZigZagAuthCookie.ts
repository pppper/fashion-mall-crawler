import axios, { AxiosResponse } from "axios";
import { ZigZagLoginFailedException } from "./exceptions";

export const getZigZagAuthCookieFromEmailAndPassword = (
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
        throw new ZigZagLoginFailedException();
      }
    })
    .catch((error) => {
      throw new ZigZagLoginFailedException({ error });
    });
};
