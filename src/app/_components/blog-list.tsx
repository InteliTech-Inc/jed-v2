"use client";

import { urlFor } from "@/lib/url-for";
import { Post } from "@/interfaces/block.interface";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ClientSideRoutes from "./client_side_routes";
import { Button } from "@/components/ui/button";

type Props = {
  posts: Post[];
};

export default function BlogList({ posts }: Readonly<Props>) {
  const [currentPosts, setCurrentPosts] = useState<number>(1);
  const totalPosts = posts.length;
  const postPerPage = 6;

  const indexOfLastPost = currentPosts * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPostsToShow = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPost = () => {
    setCurrentPosts(currentPosts + 1);
  };

  const prevPost = () => {
    setCurrentPosts(currentPosts - 1);
  };

  return (
    <div className="md:px-10 px-6 max-w-[1200px] mx-auto">
      <div className="mt-12">
        <h1 className="text-3xl mb-5 md:mb-0 md:text-5xl font-bold">
          JED <mark className="text-secondary">BLOG</mark>
        </h1>
      </div>
      <blockquote className="mt-3 text-gray-500">
        <p>Read about the latest updates, and stories from our team.</p>
      </blockquote>

      {currentPostsToShow.length === 0 ? (
        <div className="flex w-full items-center justify-center h-96">
          <p className="text-4xl md:text-5xl font-bold">No Posts Found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 gap-y-16 pb-24" role="list" aria-label="Blog posts">
          {currentPostsToShow.map((post) => (
            <ClientSideRoutes key={post._id} route={`/blog/${post.slug.current}`}>
              <article className="flex flex-col overflow-hidden group cursor-pointer rounded-lg" role="listitem">
                <div className="relative w-fill h-60 !overflow-hidden">
                  <Image
                    className="object-cover md:object-center rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
                    src={post.mainImage ? urlFor(post.mainImage)?.url() : ""}
                    alt={`Featured image for ${post.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 w-full bg-opacity-20 bg-gradient-to-b from-transparent to-black/60 rounded text-white p-5 flex justify-between">
                    <div className="w-full">
                      <time dateTime={new Date(post._createdAt).toISOString()} className="w-fit text-white ml-auto">
                        {new Date(post._createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex-1">
                  <h2 className="text-lg font-bold">
                    <span className="underline">{post.title}</span>
                  </h2>
                  <p className="text-gray-500 line-clamp-2">{post.description}</p>
                </div>
              </article>
            </ClientSideRoutes>
          ))}
        </div>
      )}

      {pageNumbers.length > 1 && (
        <nav className="flex items-center mb-8 justify-center gap-2" aria-label="Pagination">
          <Button
            onClick={prevPost}
            disabled={currentPosts === 1}
            className="h-6 w-6 cursor-pointer text-secondary hover:text-secondary/80 transition duration-150 ease-in-out hover:scale-105 disabled:text-gray-400 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft />
          </Button>
          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => setCurrentPosts(pageNumber)}
              className={`${
                currentPosts === pageNumber ? "bg-secondary text-white" : "bg-white text-secondary hover:bg-secondary/70 hover:text-white"
              } !h-8 !w-8 !p-0 rounded-full transition duration-150 ease-in-out hover:scale-105`}
              aria-label={`Page ${pageNumber}`}
              aria-current={currentPosts === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          ))}
          <Button
            onClick={nextPost}
            disabled={currentPosts === pageNumbers.length}
            className="h-6 w-6 cursor-pointer text-secondary hover:text-secondary/80 transition duration-150 ease-in-out hover:scale-105 disabled:text-gray-400 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight />
          </Button>
        </nav>
      )}
    </div>
  );
}
