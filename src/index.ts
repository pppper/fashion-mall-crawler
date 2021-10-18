import { ZigZagCrawlerModule } from "./crawlers/zigzag";
import { ZigZagAuthenticationStrategyEnum } from "./types/enums/ZigZagAuthenticationStrategy.enum";

ZigZagCrawlerModule.getClothingList(
  ZigZagAuthenticationStrategyEnum.USE_EMAIL_AND_PASSWORD
)("sebastianrcnt@gmail.com", "SECRET").then((clothingList) => {
  console.log(clothingList);
});
