import { ZigZagOwnedClothingListCrawlerFactory } from "./crawlers/zigzag";
import { ZigZagAuthenticationStrategyEnum } from "./types/enums/ZigZagAuthenticationStrategy.enum";

const zigZagClothingListCrawler =
  ZigZagOwnedClothingListCrawlerFactory.createCrawlerWithStrategy(
    ZigZagAuthenticationStrategyEnum.USE_EMAIL_AND_PASSWORD
  );

zigZagClothingListCrawler("sebastianrcnt@gmail.com", "SECRET");
