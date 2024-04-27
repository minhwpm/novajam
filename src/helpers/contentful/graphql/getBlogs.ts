import normalizeDataCollection from "./normalizeDataCollection";

export default async function getBlogs(
  limit?: number,
  skip?: number,
  featured?: boolean,
  topic?: string[],
  excludeSlug?: string
) {
  const res = await fetch(
    `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authenticate the request
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
      },
      // send the GraphQL query
      body: JSON.stringify({
        query: `
      query($limit: Int, $skip: Int, $featured: Boolean, $topic: [String], $excludeSlug: String) {
        blogCollection(
          limit: $limit,
          skip: $skip,
          where: { 
            featured: $featured
            topics_contains_some: $topic
            slug_not: $excludeSlug
          }
        ) {
          total
          items {
            sys {
              id
              firstPublishedAt
              publishedAt
            }
            title
            featured
            slug
            media {
              title
              url
              width
              height
              contentType
            }
            summary
            topics
            author {
              sys {
                id
              }
              fullName
            }
          }
        }
      }
    `,
        variables: {
          limit,
          skip,
          featured,
          topic,
          excludeSlug,
        },
      }),
    }
  );

  const data = await res.json();
  if (res.status !== 200) {
    console.error(data);
    throw new Error("Failed to fetch Blog List data. Error", data.error);
  }
  const normalizedData = normalizeDataCollection({ ...data.data });
  // console.log(`BLOG LIST DATA: ${JSON.stringify(normalizedData, null, 4)}`)
  return normalizedData;
}
