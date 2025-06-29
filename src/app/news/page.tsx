"use client";
import { useState, useEffect } from "react";
import {
  ExternalLink,
  RefreshCw,
  Globe,
  Newspaper,
  TrendingUp,
  Clock,
} from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <RefreshCw className="animate-spin h-8 w-8 text-blue-900" />
          </div>
          <p className="text-blue-200 text-xl font-medium">
            Loading latest news...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <p className="text-red-400 text-xl font-medium mb-6">{error}</p>
          <Button
            onClick={fetchNews}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Background with animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-400/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Newspaper className="h-6 w-6 text-blue-900" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 drop-shadow-lg">
              Industry News
            </h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Stay updated with the latest developments in legal technology and
            software engineering. Our intelligent news aggregator scrapes
            articles from across the internet and presents them in a clean,
            digestible format for easy reading and reference.
          </p>
          <Button
            onClick={fetchNews}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={loading}
          >
            <RefreshCw
              className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh News
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Legal Industry News */}
          <div className="group relative">
            <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-800/50 to-blue-700/50 border-b border-white/10">
                <CardTitle className="flex items-center gap-3 text-yellow-400 text-2xl font-bold">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-yellow-400" />
                  </div>
                  Legal Industry News
                </CardTitle>
                <CardDescription className="text-blue-200 text-lg leading-relaxed">
                  Our technology continuously monitors legal publications, law
                  firm updates, and regulatory changes from across the web.
                  Articles are automatically categorized and presented with
                  relevant context to help you stay informed about the latest
                  developments in legal technology and practice.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-blue-900/50">
                <div className="space-y-4">
                  {newsData?.legal?.map((article, index) => (
                    <div
                      key={index}
                      className="group/article border-b border-blue-700/50 pb-4 last:border-b-0 last:pb-0"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group/article"
                      >
                        <h3 className="font-bold text-blue-100 text-base group-hover/article:text-yellow-400 transition-colors line-clamp-2 mb-2 leading-tight">
                          {article.title}
                        </h3>
                        {article.description && (
                          <p className="text-blue-300 text-sm line-clamp-2 mb-3 leading-relaxed">
                            {article.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-400 font-medium">
                            {article.source}
                          </span>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-400" />
                            <ExternalLink className="h-4 w-4 text-blue-400 opacity-0 group-hover/article:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tech Industry News */}
          <div className="group relative">
            <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-800/50 to-blue-700/50 border-b border-white/10">
                <CardTitle className="flex items-center gap-3 text-green-400 text-2xl font-bold">
                  <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  Technology Industry News
                </CardTitle>
                <CardDescription className="text-blue-200 text-lg leading-relaxed">
                  Stay ahead of the curve with real-time updates from the
                  technology sector. Our system aggregates news from leading
                  tech publications, providing insights into software
                  development trends, cybersecurity developments, and emerging
                  technologies that impact both legal and business landscapes.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-blue-900/50">
                <div className="space-y-4">
                  {newsData?.tech?.map((article, index) => (
                    <div
                      key={index}
                      className="group/article border-b border-blue-700/50 pb-4 last:border-b-0 last:pb-0"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group/article"
                      >
                        <h3 className="font-bold text-blue-100 text-base group-hover/article:text-green-400 transition-colors line-clamp-2 mb-2 leading-tight">
                          {article.title}
                        </h3>
                        {article.description && (
                          <p className="text-blue-300 text-sm line-clamp-2 mb-3 leading-relaxed">
                            {article.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-400 font-medium">
                            {article.source}
                          </span>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-400" />
                            <ExternalLink className="h-4 w-4 text-blue-400 opacity-0 group-hover/article:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-6">
              <p className="text-blue-200 text-sm">
                Articles are automatically updated throughout the day. Click
                &quot;Refresh News&quot; to get the latest updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
