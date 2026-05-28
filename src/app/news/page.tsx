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
import { Globe, RefreshCw, ExternalLink } from "lucide-react";

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
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-meadow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="animate-spin h-7 w-7 text-forest-800" />
          </div>
          <p className="text-forest-700 font-medium">Gathering the latest news…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-terracotta-500 font-medium mb-6">{error}</p>
          <Button
            onClick={fetchNews}
            className="rounded-full bg-forest-800 hover:bg-forest-900 text-paper-50"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="font-display text-4xl sm:text-5xl text-forest-900 mb-4">
            Industry News
          </h1>
          <p className="text-forest-700/80 text-lg max-w-2xl leading-relaxed mb-6">
            Legal technology, insurance, and software developments—curated for
            quick reading.
          </p>
          <Button
            onClick={fetchNews}
            variant="outline"
            className="rounded-full border-forest-700/25"
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-paper-50/85 border-paper-300 shadow-paper backdrop-blur-sm">
            <CardHeader className="border-b border-paper-300">
              <CardTitle className="flex items-center gap-3 font-display text-2xl text-forest-900">
                <Globe className="h-5 w-5 text-terracotta-400" />
                Legal & Insurance
              </CardTitle>
              <CardDescription className="text-forest-700/75">
                Regulatory changes, legal tech, and industry practice updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {newsData?.legal?.map((article, index) => (
                  <div
                    key={index}
                    className="group/article border-b border-paper-300 pb-4 last:border-b-0 last:pb-0"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:bg-meadow-50/80 rounded-lg p-3 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-display text-lg text-forest-900 mb-1 group-hover/article:text-terracotta-500 transition-colors">
                            {article.title}
                          </h3>
                          {article.description && (
                            <p className="text-forest-700/75 text-sm mb-2 leading-relaxed">
                              {article.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-forest-700/50">
                            <span>{article.source}</span>
                            {article.publishedAt && (
                              <span>
                                {new Date(
                                  article.publishedAt
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-forest-700/40 group-hover/article:text-terracotta-400 shrink-0 mt-1" />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-paper-50/85 border-paper-300 shadow-paper backdrop-blur-sm">
            <CardHeader className="border-b border-paper-300">
              <CardTitle className="flex items-center gap-3 font-display text-2xl text-forest-900">
                <Globe className="h-5 w-5 text-meadow-400" />
                Technology
              </CardTitle>
              <CardDescription className="text-forest-700/75">
                Frameworks, tools, and trends in modern development.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {newsData?.tech?.map((article, index) => (
                  <div
                    key={index}
                    className="group/article border-b border-paper-300 pb-4 last:border-b-0 last:pb-0"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:bg-meadow-50/80 rounded-lg p-3 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-display text-lg text-forest-900 mb-1 group-hover/article:text-terracotta-500 transition-colors">
                            {article.title}
                          </h3>
                          {article.description && (
                            <p className="text-forest-700/75 text-sm mb-2 leading-relaxed">
                              {article.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-forest-700/50">
                            <span>{article.source}</span>
                            {article.publishedAt && (
                              <span>
                                {new Date(
                                  article.publishedAt
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-forest-700/40 group-hover/article:text-terracotta-400 shrink-0 mt-1" />
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
  );
}
