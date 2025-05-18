import React from "react";
import { PortableText } from "@portabletext/react";
import { client } from "@/client";
import { RichText } from "../_components/rich-text";
import Image from "next/image";
import { Post } from "@/interfaces/block.interface";
import BackButton from "../../_components/back-button";
import { urlFor } from "@/lib/url-for";
import { Metadata } from "next";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export async function generateStaticParams() {
  const query = `
    *[_type == "post"]
    {
      slug
    }
   `;
  const posts: Post[] = await client.fetch(query);
  const slugRoutes = posts.map((post) => post.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      "image": mainImage.asset -> url,
      author->,
      _createdAt,
      _updatedAt,
      categories[]->
    }`,
    { slug }
  );

  if (!post) {
    return {
      title: "Post Not Found | JED Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const categories = post.categories?.map((cat: any) => cat.title).join(", ") || "";

  return {
    title: `${post.title} | JED Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt,
      authors: [post.author.name],
      tags: categories.split(", "),
      images: [
        {
          url: post.image,
          alt: post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function SinglePost({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]
    {
    ...,
    author->,
    categories[]->
    }
  `,
    { slug },
    { next: { revalidate: 1 } }
  );

  if (posts === null) {
    return <NotFound />;
  }

  const schemaPost = {
    "@type": "BlogPosting",
    headline: posts.title,
    description: posts.description,
    url: `${process.env.NEXT_PUBLIC_LIVE_URL}/blog/${posts.slug.current}`,
    datePublished: new Date(posts._createdAt).toISOString(),
    dateModified: new Date(posts._updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: posts.author.name,
      image: posts.author.image
        ? {
            "@type": "ImageObject",
            url: urlFor(posts.author.image).url(),
            caption: posts.author.name,
          }
        : undefined,
    },
    image: {
      "@type": "ImageObject",
      url: urlFor(posts.mainImage).url(),
      caption: posts.title,
    },
    keywords: posts.categories?.map((cat: any) => cat.title).join(", "),
  };

  return (
    <article className="min-h-screen " itemScope itemType="https://schema.org/BlogPosting">
      <script type="application/ld+json" id="schema-post" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPost) }} />
      <section className="flex p-4 flex-col items-center justify-center w-full md:w-[55dvw] mx-auto">
        <div className="my-8">
          <BackButton />
          <h1 className="text-3xl leading-[1.6] py-4 md:text-5xl md:leading-[4rem] font-semibold text-neutral-700 lg:text-center" itemProp="headline">
            {posts.title}
          </h1>
          <div className="flex flex-row items-center lg:justify-center gap-2 md:gap-x-4 my-5">
            <Image
              src={urlFor(posts.author.image).url()}
              alt={`${posts.author.name}'s profile picture`}
              width={200}
              height={200}
              className="rounded-full w-8 h-8 object-cover object-top"
            />
            <section className="flex flex-col lg:flex-row items-start justify-center lg:items-center">
              <p className="flex items-center justify-center">
                <span className="font-bold" itemProp="author">
                  {posts.author.name ? `By ${posts.author.name}` : "User"}
                </span>
              </p>
              <span className="hidden md:block text-lg text-gray-500 px-2" aria-hidden="true">
                &#x2022;
              </span>
              <time className="text-gray-500" dateTime={new Date(posts._createdAt).toISOString()} itemProp="datePublished">
                {new Date(posts._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </section>
          </div>
          <div className="w-full md:h-[20rem] my-14">
            <Image
              src={urlFor(posts.mainImage).url()}
              alt={posts.title}
              width={2000}
              height={2000}
              className="object-cover object-bottom w-full h-full rounded-lg"
              priority
            />
          </div>
          <div itemProp="articleBody">
            <PortableText value={posts.body} components={RichText} />
          </div>
          <hr className="dark:border-white/55 border-primary my-6" />
          <div className="flex items-start gap-4">
            <Image
              src={urlFor(posts.author.image).url()}
              alt={`${posts.author.name}'s profile picture`}
              width={2000}
              height={2000}
              className="rounded-full w-12 aspect-square object-cover object-top hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <div>
              <div className="flex items-center gap-3 -mb-6">
                <p className="font-bold text-xl">{posts.author.name}</p>
                <Link href={`${posts.author.social}`} target="_blank" aria-label={`Visit ${posts.author.name}'s social profile`}>
                  <LinkIcon height={20} width={20} className="text-gray-500 hover:text-secondary transition-all duration-150 ease-in" />
                </Link>
              </div>
              <PortableText value={posts.author.bio} components={RichText} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
