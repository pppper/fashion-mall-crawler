// usage examples

import { ZigZagOwnedClothingListCrawlerFactory } from "./crawlers/owned-clothing-list/zigzag/crawler-factories";
import { ZigZagAuthenticationStrategy } from "./types/enums/ZigZagAuthenticationStrategy.enum";
import Exceptions from "./types/exceptions";

async function zigZagOwnedClothingListCrawlerUsageExample() {
  const getZigZagClothingList =
    ZigZagOwnedClothingListCrawlerFactory.createCrawlerWithStrategy(
      ZigZagAuthenticationStrategy.USE_EMAIL_AND_PASSWORD
    );
  try {
    const clothingList = await getZigZagClothingList("email", "password");
    console.log(clothingList);
  } catch (error) {
    if (error instanceof Exceptions.ZigZagLoginFailedException) {
      console.log("login failed");
    } else {
      throw error;
    }
  }
}
