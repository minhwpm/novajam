import normalizeDataCollection from "./normalizeDataCollection"

export default async function getFooter(path: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($path: String) {
        footerCollection(
          where: { 
            path: $path
          } 
        ) {
          items {
            logo {
              url
              title
            }
            copyright
            menuCollection (limit: 5) {
              items {
                title
                linksCollection (limit: 15) {
                  items {
                    sys {
                      id
                    }
                    text
                    newTab
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
      variables: {
        path,
      },
    }),
  })

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Header data')
  }
  
  const data = await res.json()
  const normalizedData = normalizeDataCollection({...data.data})
  return normalizedData[0]
}