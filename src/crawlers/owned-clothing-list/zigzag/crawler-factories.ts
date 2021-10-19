import { ZigZagAuthenticationStrategyEnum } from "../../../types/enums/ZigZagAuthenticationStrategy.enum";
import Exceptions from "../../../types/exceptions";
import { crawlZigZagOwnedClothingListFromEmailAndPassword } from "./crawlers";

class ZigZagOwnedClothingListCrawlerFactory {
  static createCrawlerWithStrategy(strategy: ZigZagAuthenticationStrategyEnum) {
    switch (strategy) {
      case ZigZagAuthenticationStrategyEnum.USE_EMAIL_AND_PASSWORD:
        return crawlZigZagOwnedClothingListFromEmailAndPassword;
      default:
        throw new Exceptions.InvalidZigZagAuthenticationStrategyEnum();
    }
  }
}

export { ZigZagOwnedClothingListCrawlerFactory };
