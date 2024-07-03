import express from "express";
import * as webScraperController from "../controllers/WebScraperController";

const webScraperRouter = express.Router();

/**
 * @swagger
 * tags:
 *    name: WebScraper
 *    description: Endpoints for Web Scraper management
 */

/**
 * @swagger
 * /api/v1/webScraper/cheerio-webscraper:
 *   post:
 *     summary: API endpoint for cheerio web scraper
 *     description: API endpoint for cheerio web scraper
 *     tags: [WebScraper]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: www.example.com
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   example: {}
 *
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 data:
 *                   type: object
 *                   example: null
 */

webScraperRouter.post("/cheerio-webscraper", webScraperController.webScraper);

export { webScraperRouter };
