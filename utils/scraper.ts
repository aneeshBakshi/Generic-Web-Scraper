import { crawlWebsite } from "./crawler";
import { checkUrlValidity } from "./helper";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

async function scraper(link: any) {
  try {
    if (!(await checkUrlValidity(link))) {
      return [];
    }
    const loader = new CheerioWebBaseLoader(link, { timeout: 4000 });
    // const loader = new PuppeteerWebBaseLoader(link);

    const docs = await loader.load();
    return docs;
  } catch (error: any) {
    console.log(`Error in scraper function: ${error.message}`);
    const urlToAppend = link + "\n";
    fs.appendFileSync("errorLog.txt", urlToAppend);
    return [];
  }
}

async function storeURLEmbeddings(url: string) {
  try {
    const pages = await crawlWebsite(url);

    if (pages.length !== 0) {
      const resArray: any = [];
      for (let i = 0; i < pages.length; i++) {
        //   let page = pages[i];
        //   for (let j = 0; j < page.length; j++) {
        const res = await scraper(pages[i]);

        if (res?.length !== 0) {
          resArray.push(res?.[0]);
        }
        // }
      }
      if (resArray.length !== 0) {
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 3000,
        });
        const splitDocs = await splitter.splitDocuments(resArray);
        splitDocs.forEach((doc) => {
          doc.metadata.url = url;
        });

        // Write splitDocs to result.txt
        const resultString = splitDocs
          .map((doc) => JSON.stringify(doc))
          .join("\n");
        fs.writeFileSync("result.txt", resultString);
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export { storeURLEmbeddings };
