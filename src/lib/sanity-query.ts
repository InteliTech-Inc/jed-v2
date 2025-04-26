import { defineQuery } from "next-sanity";

export const postQuery = defineQuery(
  `
  *[_type == "post"]{
    ...,
    "mainImage": mainImage.asset -> url,
    author->,
  } | order(_createdAt desc)
`
);

export const commissionQuery = defineQuery(
  `
*[_type == "commission_rate"]{
    _id,
    commission,
}
`
);
