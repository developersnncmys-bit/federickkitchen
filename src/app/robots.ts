import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The house's own panel and the API are nobody's search result.
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
