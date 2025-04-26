import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/admin"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_LIVE_URL}/sitemap.xml`,
  };
}
