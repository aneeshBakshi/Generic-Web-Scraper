import axios from "axios";
import { JSDOM } from "jsdom";
import { URL } from "url";
import fs from "fs";

// Function to crawl a website efficiently
async function crawlWebsite(
  baseURL: string,
  maxDepth: number = 3,
  maxPages: number = 50
): Promise<string[]> {
  const visited: Set<string> = new Set(); // Set to store visited URLs
  const queue: { url: string; depth: number }[] = [{ url: baseURL, depth: 0 }]; // Queue of URLs to crawl
  const uniqueLinks: Set<string> = new Set(); // Set to store unique links

  // Helper function to fetch and process a URL
  async function processURL(url: string, depth: number): Promise<void> {
    try {
      // Fetch HTML content of the URL
      const response = await axios.get(url);
      const html = response.data;

      // Parse HTML using jsdom
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Extract relevant data from the page (e.g., title, links, etc.)
      const links = Array.from(document.querySelectorAll("a[href]"))
        .map((link) => new URL(link.getAttribute("href")!, url).href)
        .filter((link) => isSameDomain(baseURL, link)); // Resolve links to absolute URLs

      // Add unique links to the set
      links.forEach((link) => uniqueLinks.add(link));

      // Add the URL to the set of visited URLs
      visited.add(url);

      // Enqueue new URLs to crawl if not visited and within maxDepth
      if (depth < maxDepth) {
        links.forEach((link) => {
          if (!visited.has(link) && uniqueLinks.size < maxPages) {
            queue.push({ url: link, depth: depth + 1 });
          }
        });
      }
    } catch (error) {
      console.error(`Error crawling ${url}: ${(error as Error).message}`);
    }
  }

  // Function to check if a URL belongs to the same domain as the base URL
  function isSameDomain(baseURL: string, url: string): boolean {
    const baseURLObj = new URL(baseURL);
    const urlObj = new URL(url);
    return baseURLObj.hostname === urlObj.hostname;
  }

  // Main crawling loop
  while (queue.length > 0 && uniqueLinks.size < maxPages) {
    const { url, depth } = queue.shift()!;
    if (!visited.has(url)) {
      await processURL(url, depth);
    }
  }

  // Convert the set of unique links to an array and save it to a file
  const uniqueLinksArray = Array.from(uniqueLinks);
  fs.writeFileSync("pagesURL.txt", JSON.stringify(uniqueLinksArray, null, 2));
  return uniqueLinksArray;
}

export { crawlWebsite };
