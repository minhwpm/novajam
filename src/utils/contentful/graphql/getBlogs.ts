import normalizeDataCollection from "./normalizeDataCollection"

export default async function getBlogs(limit: number, skip: number) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($limit: Number, $skip: Number) {
        blogCollection(
          limit: $limit,
          skip: $skip
        ) {
          items {
            sys {
              id
            }
            title
            slug
            media {
              title
              url
              width
              height
            }
            summary
            categoryCollection {
              items {
                title
                slug
              }
            }
            topics
            author {
              sys {
                id
              }
              fullName
              portrait {
                url
                title
                width
                height
              }
              role
            }
            metaTitle
            metaDescription
          }
        }
      }
    `, 
      variables: {
        limit,
        skip
      },
    }),
  })

  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Blog List data. Error", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})

  console.log(`BLOG LIST DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}