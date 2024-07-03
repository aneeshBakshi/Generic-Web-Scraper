import { checkUrlValidity } from "../utils/helper";
import { crawlWebsite } from "../utils/crawler";
import { storeURLEmbeddings } from "../utils/scraper";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/values";
import { APIResponse } from "../model/APIResponse";

// Cheerio based web scraper logic. It only scrapes the static HTML web content
async function webScraper(model: any): Promise<APIResponse> {
  try {
    const { url } = model;

    if (!url) {
      return {
        status: 400,
        message: ERROR_MESSAGES.BAD_REQUEST,
        data: null,
      };
    }

    if (!(await checkUrlValidity(url))) {
      return {
        status: 400,
        message: ERROR_MESSAGES.INVALID_LINK,
        data: null,
      };
    }

    storeURLEmbeddings(url);
    return {
      status: 200,
      message: SUCCESS_MESSAGES.SCRAPE_RESPONSE,
      data: null,
    };
  } catch (error: any) {
    console.log(`Error in webScraper: ${error.message}`);
    return {
      status: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER,
      data: null,
    };
  }
}

export { webScraper };
