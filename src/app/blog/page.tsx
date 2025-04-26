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
    <>
      <script
        type="application/ld+json"
        id="schema-blog"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogList posts={posts} />
    </>
  );
}
