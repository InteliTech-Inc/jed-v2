import { StaticImageData } from "next/image";

interface Base {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _rev: string;
  _type: string;
}

export interface Post extends Base {
  author: Author;
  body: Block[];
  categories: Category[];
  mainImage: StaticImageData;
  slug: Slug;
  title: string;
  description: string;
}

export interface Author extends Base {
  bio: Block[];
  image: Image;
  name: string;
  social: string;
  slug: Slug;
}

interface Image {
  _type: "image";
  asset: Reference;
}

interface Reference {
  _ref: string;
  _type: "reference";
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote" | "code";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Category extends Base {
  title: string;
  description: string;
}
