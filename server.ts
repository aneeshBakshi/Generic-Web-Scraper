import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
dotenv.config();

import { webScraperRouter } from "./routes/WebScraperRoute";

const app = express();

const PORT = Number(process.env.PORT) | 8023;

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "WebScraping-PROJECT",
      version: "0.0.1",
      description: "Test Web Scraper API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.ts"],
};

const specs = swaggerJsdoc(swaggerOptions);

// Middleware

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      authActions: {
        bearerAuth: {
          name: "Authorization",
          schema: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "",
          },
          value: "Bearer <JWT token>",
        },
      },
    },
  })
);

// Routes
app.use("/api/v1/webScraper", webScraperRouter);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost${PORT}`);
});
