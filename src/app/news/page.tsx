"use client";
import { useState, useEffect } from "react";
import { ExternalLink, RefreshCw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewsArticle {
  title: string;
  url: string;
  source: string;
  publishedAt?: string;
  description?: string;
}

interface NewsData {
  legal: NewsArticle[];
  tech: NewsArticle[];
}

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNewsData(data);
    } catch (err) {
      setError("Failed to load news articles");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading latest news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchNews} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Industry News</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest developments in legal technology and
          software engineering. Our intelligent news aggregator scrapes articles
          from across the internet and presents them in a clean, digestible
          format for easy reading and reference.
        </p>
        <Button
          onClick={fetchNews}
          variant="outline"
          className="mt-4"
          disabled={loading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh News
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Legal Industry News */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Legal Industry News
            </CardTitle>
            <CardDescription>
              Our technology continuously monitors legal publications, law firm
              updates, and regulatory changes from across the web. Articles are
              automatically categorized and presented with relevant context to
              help you stay informed about the latest developments in legal
              technology and practice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsData?.legal?.map((article, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-4 last:border-b-0"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {article.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.source}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tech Industry News */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Technology Industry News
            </CardTitle>
            <CardDescription>
              Stay ahead of the curve with real-time updates from the technology
              sector. Our system aggregates news from leading tech publications,
              providing insights into software development trends, cybersecurity
              developments, and emerging technologies that impact both legal and
              business landscapes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsData?.tech?.map((article, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-4 last:border-b-0"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {article.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.source}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Articles are automatically updated throughout the day. Click
          &quot;Refresh News&quot; to get the latest updates.
        </p>
      </div>
    </div>
  );
}
