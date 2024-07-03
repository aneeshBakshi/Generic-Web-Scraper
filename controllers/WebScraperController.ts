import * as webScraperService from "../services/WebScraperService";
import { Request, Response } from "express";

async function webScraper(req: Request, res: Response) {
  const model = req.body;
  const response = await webScraperService.webScraper(model);
  res.status(response.status).json(response);
}

export { webScraper };
