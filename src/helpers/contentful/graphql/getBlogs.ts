import normalizeDataCollection from "./normalizeDataCollection"

export default async function getBlogs(limit: number, skip: number, featured?: boolean) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($limit: Int, $skip: Int, $featured: Boolean) {
        blogCollection(
          limit: $limit,
          skip: $skip,
          where: { 
            featured: $featured
          }
        ) {
          total
          items {
            sys {
              id
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
        featured
      },
    }),
  })

  const data = await res.json()
  console.log(`BLOG LIST RAW DATA: ${JSON.stringify(data, null, 4)}`)

  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Blog List data. Error", data.error)
  }

  const normalizedData = normalizeDataCollection({...data.data})

  console.log(`BLOG LIST DATA: ${JSON.stringify(normalizedData, null, 4)}`)
  return normalizedData
}