import normalizeContentfulData from './normalizeContentfulData';

export async function getBlogs(
  limit?: number,
  skip?: number,
  featured?: boolean,
  topic?: string,
  excludeSlug?: string,
) {
  try {
    const res = await fetch(
      `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
            content
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
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch Blog List data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`,
      );
    }
    const data = await res.json();

    const normalizedData = normalizeContentfulData(data.data);
    return normalizedData;
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while fetching blog list data: ${error}`,
    );
  }
}
