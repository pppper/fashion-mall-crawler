import { InvalidZigZagAuthenticationStrategyEnum } from "../../excpetions";
import { ZigZagAuthenticationStrategyEnum } from "../../types/enums/ZigZagAuthenticationStrategy.enum";
import { getZigZagOwnedClothingListFromEmailAndPassword } from "./getZigZagOwnedClothingList";

export class ZigZagOwnedClothingListCrawlerFactory {
  static createCrawlerWithStrategy(strategy: ZigZagAuthenticationStrategyEnum) {
    switch (strategy) {
      case ZigZagAuthenticationStrategyEnum.USE_EMAIL_AND_PASSWORD:
        return getZigZagOwnedClothingListFromEmailAndPassword;
      case ZigZagAuthenticationStrategyEnum.UNSET:
      default:
        throw new InvalidZigZagAuthenticationStrategyEnum();
    }
  }
}
