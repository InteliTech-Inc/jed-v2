export const BLOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog",
  description: "A blog about various topics and how to use the JED platform",
  url: `${process.env.NEXT_PUBLIC_LIVE_URL}/blog`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${process.env.NEXT_PUBLIC_LIVE_URL}/blog`,
    name: "Blog",
    description: "A blog about various topics",
  },
};
