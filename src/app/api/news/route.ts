import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

interface NewsArticle {
  title: string;
  url: string;
  source: string;
  publishedAt?: string;
  description?: string;
}

async function scrapeLegalNews(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  // Law360 - Legal News
  try {
    const law360Response = await axios.get("https://www.law360.com/");
    const $ = cheerio.load(law360Response.data);
    $(".article-title")
      .slice(0, 3)
      .each((i, element) => {
        const title = $(element).text().trim();
        const url = $(element).find("a").attr("href");
        if (title && url) {
          articles.push({
            title,
            url: url.startsWith("http") ? url : `https://www.law360.com${url}`,
            source: "Law360",
            publishedAt: new Date().toISOString().split("T")[0],
          });
        }
      });
  } catch (error) {
    console.error("Error scraping Law360:", error);
  }

  // ABC News - Technology
  try {
    const abcResponse = await axios.get("https://abcnews.go.com/Technology");
    const $ = cheerio.load(abcResponse.data);
    $(".ContentRoll__Headline")
      .slice(0, 2)
      .each((i, el) => {
        const title = $(el).text().trim();
        const url = $(el).find("a").attr("href");
        if (title && url) {
          articles.push({
            title,
            url: url.startsWith("http") ? url : `https://abcnews.go.com${url}`,
            source: "ABC News",
          });
        }
      });
  } catch (e) {
    console.error("Error scraping ABC News:", e);
  }

  // Forbes - Technology
  try {
    const forbesResponse = await axios.get(
      "https://www.forbes.com/technology/"
    );
    const $ = cheerio.load(forbesResponse.data);
    const el = $("h3").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      articles.push({
        title,
        url: url.startsWith("http") ? url : `https://www.forbes.com${url}`,
        source: "Forbes",
      });
    }
  } catch (e) {
    console.error("Error scraping Forbes:", e);
  }

  // Fallback articles if scraping fails
  if (articles.length === 0) {
    articles.push(
      {
        title:
          "AI in Legal Practice: Transforming Document Review and Case Analysis",
        url: "https://www.law360.com/articles/ai-legal-practice",
        source: "Law360",
        publishedAt: new Date().toISOString().split("T")[0],
        description:
          "How artificial intelligence is revolutionizing legal document review and case analysis processes.",
      },
      {
        title: "Cybersecurity Regulations Impacting Law Firms in 2024",
        url: "https://www.law360.com/articles/cybersecurity-law-firms",
        source: "Law360",
        publishedAt: new Date().toISOString().split("T")[0],
        description:
          "New cybersecurity requirements and their implications for legal practice.",
      },
      {
        title: "Legal Tech Startups: Innovation in the Legal Industry",
        url: "https://www.law360.com/articles/legal-tech-startups",
        source: "Law360",
        publishedAt: new Date().toISOString().split("T")[0],
        description:
          "Emerging legal technology companies and their impact on traditional legal services.",
      }
    );
  }

  // Return up to 5 articles
  return articles.slice(0, 5);
}

async function scrapeTechNews(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  // Helper to add only if not already present and not empty
  function addArticle(article: NewsArticle) {
    if (
      article.title &&
      article.url &&
      !articles.some((a) => a.source === article.source)
    ) {
      articles.push(article);
    }
  }

  // Ars Technica
  try {
    const arsResponse = await axios.get("https://arstechnica.com/");
    const $ = cheerio.load(arsResponse.data);
    const el = $("h2").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      addArticle({
        title,
        url: url.startsWith("http") ? url : `https://arstechnica.com${url}`,
        source: "Ars Technica",
      });
    }
  } catch (error) {
    console.error("Error scraping Ars Technica:", error);
  }

  // The Verge
  try {
    const vergeResponse = await axios.get("https://www.theverge.com/");
    const $ = cheerio.load(vergeResponse.data);
    const el = $("h2").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      addArticle({
        title,
        url: url.startsWith("http") ? url : `https://www.theverge.com${url}`,
        source: "The Verge",
      });
    }
  } catch (error) {
    console.error("Error scraping The Verge:", error);
  }

  // Wired
  try {
    const wiredResponse = await axios.get("https://www.wired.com/");
    const $ = cheerio.load(wiredResponse.data);
    const el = $("h3").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      addArticle({
        title,
        url: url.startsWith("http") ? url : `https://www.wired.com${url}`,
        source: "Wired",
      });
    }
  } catch (error) {
    console.error("Error scraping Wired:", error);
  }

  // VentureBeat
  try {
    const vbResponse = await axios.get("https://venturebeat.com/");
    const $ = cheerio.load(vbResponse.data);
    const el = $("h2").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      addArticle({
        title,
        url: url.startsWith("http") ? url : `https://venturebeat.com${url}`,
        source: "VentureBeat",
      });
    }
  } catch (error) {
    console.error("Error scraping VentureBeat:", error);
  }

  // TechCrunch
  try {
    const techCrunchResponse = await axios.get("https://techcrunch.com/");
    const $ = cheerio.load(techCrunchResponse.data);
    const el = $("h2").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      addArticle({
        title,
        url: url.startsWith("http") ? url : `https://techcrunch.com${url}`,
        source: "TechCrunch",
      });
    }
  } catch (error) {
    console.error("Error scraping TechCrunch:", error);
  }

  // CNET
  try {
    const cnetResponse = await axios.get("https://www.cnet.com/");
    const $ = cheerio.load(cnetResponse.data);
    const el = $("h3").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      addArticle({
        title,
        url: url.startsWith("http") ? url : `https://www.cnet.com${url}`,
        source: "CNET",
      });
    }
  } catch (error) {
    console.error("Error scraping CNET:", error);
  }

  // Engadget
  try {
    const engadgetResponse = await axios.get("https://www.engadget.com/");
    const $ = cheerio.load(engadgetResponse.data);
    const el = $("h2").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      addArticle({
        title,
        url: url.startsWith("http") ? url : `https://www.engadget.com${url}`,
        source: "Engadget",
      });
    }
  } catch (error) {
    console.error("Error scraping Engadget:", error);
  }

  // Mashable
  try {
    const mashableResponse = await axios.get("https://mashable.com/tech");
    const $ = cheerio.load(mashableResponse.data);
    const el = $("h2").first();
    const title = el.text().trim();
    const url = el.find("a").attr("href");
    if (title && url) {
      addArticle({
        title,
        url: url.startsWith("http") ? url : `https://mashable.com${url}`,
        source: "Mashable",
      });
    }
  } catch (error) {
    console.error("Error scraping Mashable:", error);
  }

  // Fallback articles if scraping fails
  if (articles.length === 0) {
    articles.push(
      {
        title: "The Future of AI in Software Development",
        url: "https://techcrunch.com/ai-software-development",
        source: "TechCrunch",
        publishedAt: new Date().toISOString().split("T")[0],
        description:
          "How AI is transforming the software development lifecycle and coding practices.",
      },
      {
        title: "Cybersecurity Trends: Protecting Digital Assets in 2024",
        url: "https://techcrunch.com/cybersecurity-trends-2024",
        source: "TechCrunch",
        publishedAt: new Date().toISOString().split("T")[0],
        description:
          "Latest developments in cybersecurity and threat protection strategies.",
      },
      {
        title: "Cloud Computing: The Backbone of Modern Applications",
        url: "https://techcrunch.com/cloud-computing-modern-apps",
        source: "TechCrunch",
        publishedAt: new Date().toISOString().split("T")[0],
        description:
          "How cloud infrastructure is enabling scalable and efficient application development.",
      }
    );
  }

  // Return up to 5 articles from different sources
  return articles.slice(0, 5);
}

export async function GET() {
  try {
    const [legalNews, techNews] = await Promise.all([
      scrapeLegalNews(),
      scrapeTechNews(),
    ]);

    return NextResponse.json({
      legal: legalNews,
      tech: techNews,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
