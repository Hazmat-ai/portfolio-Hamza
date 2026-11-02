import { MetadataRoute } from "next";
import content from "@/data/convergence/content.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hamzarizvi.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = Object.keys(content.caseContent).map((key) => ({
    url: `${siteUrl}/projects/${key === "asl" ? "asl-recognition" : key}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${siteUrl}/resume`, changeFrequency: "monthly", priority: 0.7 },
    ...projectUrls,
  ];
}
