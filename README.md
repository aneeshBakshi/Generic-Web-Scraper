# Test Generic Web Scraper

The Generic Web Scraper is a versatile tool built using Node.js, TypeScript, Langchain.js, and Cheerio. It is designed to extract static content from websites efficiently. This scraper is user-friendly and adaptable, making it suitable for a variety of web scraping tasks. However, please note that it is optimized for static content and may not fully support dynamic content extraction, which often requires a more tailored approach.

## Features

- **Static Content Extraction**: Efficiently extracts static HTML content from web pages using Cheerio.
- **API Endpoint**: Developed an API endpoint for web scraping using URLs, making it easy to scrape content by simply providing links.
- **Output Options**: Save scraped data in TXT format.
- **Error Handling**: Includes basic error handling mechanisms to manage common web scraping issues.

## Limitations

- **Dynamic Content**: The current version of the scraper is not designed to handle dynamic content (e.g., content loaded via JavaScript). For such cases, a more specialized scraper tailored to the specific website's structure is required.
- **Single-Page Applications**: While the scraper can navigate and extract content from multi-page websites, it may face challenges with single-page applications (SPAs) due to their reliance on dynamic content loading.

## Technologies Used

- **Node.js**: The runtime environment for executing JavaScript code.
- **TypeScript**: A strongly-typed programming language that builds on JavaScript.
- **Langchain.js**: A library for managing and orchestrating scraping workflows.
- **Cheerio**: A fast, flexible, and lean implementation of core jQuery designed specifically for the server.

## Run Locally

**Clone the project**

```bash
  git clone https://github.com/aneeshBakshi/Generic-Web-Scraper.git
```

**Go to the project directory**

```bash
  cd Generic-Web-Scraper
```

**Install dependencies**

```bash
  npm install
```

**Create a .env File**

Create a .env file using .env.sample as a reference before starting the server. Ensure you configure all necessary environment variables.

**Start the server**

```bash
  npm run dev
```

**Access the API Documentation**

Open your browser and go to the following URL to access the Swagger documentation:

```bash
  http://localhost:8000/api-docs
```

## Output

The scraped content will be saved in TXT format.

## Future Improvements

- **Dynamic Content Support**: Enhance the scraper to handle dynamic content using techniques like headless browsing.
- **Advanced Error Handling**: Implement more robust error handling for diverse web scraping scenarios.
- **User Interface**: Develop a simple GUI to make the scraper more accessible to non-technical users.

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.
