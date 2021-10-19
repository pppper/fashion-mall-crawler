import { ZigZagAuthenticationStrategy } from "../../../types/enums/ZigZagAuthenticationStrategy.enum";
import Exceptions from "../../../types/exceptions";
import { crawlZigZagOwnedClothingListFromEmailAndPassword } from "./crawlers";

class ZigZagOwnedClothingListCrawlerFactory {
  static createCrawlerWithStrategy(strategy: ZigZagAuthenticationStrategy) {
    switch (strategy) {
      case ZigZagAuthenticationStrategy.USE_EMAIL_AND_PASSWORD:
        return crawlZigZagOwnedClothingListFromEmailAndPassword;
      default:
        throw new Exceptions.InvalidZigZagAuthenticationStrategy();
    }
  }
}

export { ZigZagOwnedClothingListCrawlerFactory };
