import { Metadata } from "next";
import BlogList from "../_components/blog-list";
import { postQuery } from "@/lib/sanity-query";
import { client } from "@/client";
import { Post } from "@/interfaces/block.interface";
import { urlFor } from "@/lib/url-for";
import { BLOG_SCHEMA } from "@/structured-data/blog.schema";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Stay updated with the latest news, features, and stories from JED. Read about event management, online voting, nominations, and more.",
  openGraph: {
    title: "Blog",
    description: "Stay updated with the latest news, features, and stories from JED. Read about event management, online voting, nominations, and more.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_LIVE_URL}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Stay updated with the latest news, features, and stories from JED. Read about event management, online voting, nominations, and more.",
  },
};

export default async function BlogPage() {
  const posts = await client.fetch(postQuery, {}, { next: { revalidate: 1 } });

  const schemaPosts = posts.map((post: Post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${process.env.NEXT_PUBLIC_LIVE_URL}/blog/${post.slug.current}`,
    datePublished: new Date(post._createdAt).toISOString(),
    dateModified: new Date(post._updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      image: post.author.image
        ? {
            "@type": "ImageObject",
            url: urlFor(post.author.image).url(),
            caption: post.author.name,
          }
        : undefined,
    },
  }));

  const schema = {
    ...BLOG_SCHEMA,
    blogPost: [...schemaPosts],
  };

  return (
    <main className="min-h-screen mt-12" role="main">
      <script type="application/ld+json" id="schema-blog" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogList posts={posts} />
    </main>
  );
}
