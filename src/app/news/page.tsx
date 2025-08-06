"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Globe, RefreshCw, Newspaper, ExternalLink } from "lucide-react";

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
      // Simulate API call - replace with actual news API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with actual API response
      const mockData: NewsData = {
        legal: [
          {
            title: "AI Revolution in Legal Technology",
            url: "https://example.com/ai-legal-tech",
            source: "Legal Tech Today",
            publishedAt: "2024-12-01",
            description:
              "How artificial intelligence is transforming legal workflows and improving efficiency.",
          },
          {
            title: "New E-Discovery Regulations",
            url: "https://example.com/e-discovery",
            source: "Law.com",
            publishedAt: "2024-11-28",
            description:
              "Updated guidelines for electronic discovery in federal courts.",
          },
          {
            title: "Cybersecurity in Law Firms",
            url: "https://example.com/cybersecurity-law",
            source: "ABA Journal",
            publishedAt: "2024-11-25",
            description:
              "Best practices for protecting client data and maintaining security.",
          },
        ],
        tech: [
          {
            title: "Next.js 15 Release",
            url: "https://example.com/nextjs-15",
            source: "TechCrunch",
            publishedAt: "2024-12-01",
            description:
              "Major updates to the popular React framework with new features.",
          },
          {
            title: "TypeScript 5.3 Features",
            url: "https://example.com/typescript-5-3",
            source: "Dev.to",
            publishedAt: "2024-11-30",
            description:
              "New language features and improvements in the latest release.",
          },
          {
            title: "Cloud Computing Trends",
            url: "https://example.com/cloud-trends",
            source: "AWS Blog",
            publishedAt: "2024-11-27",
            description:
              "Emerging trends in cloud infrastructure and deployment.",
          },
        ],
      };

      setNewsData(mockData);
    } catch {
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <RefreshCw className="animate-spin h-8 w-8 text-slate-900" />
          </div>
          <p className="text-slate-300 text-xl font-medium">
            Loading latest news...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <p className="text-red-400 text-xl font-medium mb-6">{error}</p>
          <Button
            onClick={fetchNews}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-slate-900 font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background with animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-400/8 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Newspaper className="h-6 w-6 text-slate-900" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 drop-shadow-lg">
              Industry News
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Stay updated with the latest developments in legal technology and
            software engineering. Our intelligent news aggregator scrapes
            articles from across the internet and presents them in a clean,
            digestible format for easy reading and reference.
          </p>
          <Button
            onClick={fetchNews}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-slate-900 font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
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
            <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-b border-white/10">
                <CardTitle className="flex items-center gap-3 text-yellow-400 text-2xl font-bold">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-yellow-400" />
                  </div>
                  Legal Industry News
                </CardTitle>
                <CardDescription className="text-slate-300 text-lg leading-relaxed">
                  Our technology continuously monitors legal publications, law
                  firm updates, and regulatory changes from across the web.
                  Articles are automatically categorized and presented with
                  relevant context to help you stay informed about the latest
                  developments in legal technology and practice.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-slate-800/50">
                <div className="space-y-4">
                  {newsData?.legal?.map((article, index) => (
                    <div
                      key={index}
                      className="group/article border-b border-slate-700/50 pb-4 last:border-b-0 last:pb-0"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:bg-slate-700/30 rounded-lg p-3 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="text-emerald-400 font-semibold text-lg mb-2 group-hover/article:text-emerald-300 transition-colors">
                              {article.title}
                            </h3>
                            {article.description && (
                              <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                                {article.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                              <span className="font-medium">
                                {article.source}
                              </span>
                              {article.publishedAt && (
                                <span>
                                  {new Date(
                                    article.publishedAt
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-400 group-hover/article:text-emerald-400 transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology News */}
          <div className="group relative">
            <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-b border-white/10">
                <CardTitle className="flex items-center gap-3 text-yellow-400 text-2xl font-bold">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-yellow-400" />
                  </div>
                  Technology News
                </CardTitle>
                <CardDescription className="text-slate-300 text-lg leading-relaxed">
                  Stay current with the latest developments in software
                  engineering, web development, and emerging technologies. Our
                  curated selection covers frameworks, tools, and industry
                  trends that impact modern development practices.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-slate-800/50">
                <div className="space-y-4">
                  {newsData?.tech?.map((article, index) => (
                    <div
                      key={index}
                      className="group/article border-b border-slate-700/50 pb-4 last:border-b-0 last:pb-0"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:bg-slate-700/30 rounded-lg p-3 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="text-emerald-400 font-semibold text-lg mb-2 group-hover/article:text-emerald-300 transition-colors">
                              {article.title}
                            </h3>
                            {article.description && (
                              <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                                {article.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                              <span className="font-medium">
                                {article.source}
                              </span>
                              {article.publishedAt && (
                                <span>
                                  {new Date(
                                    article.publishedAt
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-400 group-hover/article:text-emerald-400 transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
