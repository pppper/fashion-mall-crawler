import { InvalidZigZagAuthenticationStrategyEnum } from "../../excpetions";
import { ZigZagAuthenticationStrategyEnum } from "../../types/enums/ZigZagAuthenticationStrategy.enum";
import { getZigZagOwnedClothingListFromEmailAndPassword } from "./getZigZagOwnedClothingList";

export namespace ZigZagCrawlerModule {
  export const getClothingList = (
    strategy: ZigZagAuthenticationStrategyEnum
  ) => {
    switch (strategy) {
      case ZigZagAuthenticationStrategyEnum.USE_EMAIL_AND_PASSWORD:
        return getZigZagOwnedClothingListFromEmailAndPassword;
      default:
        throw new InvalidZigZagAuthenticationStrategyEnum({
          message: "invalid zigzag authentication strategy",
          error: strategy,
        });
    }
  };
}
