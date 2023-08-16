import normalizeDataCollection from "./normalizeDataCollection"

export default async function getFeature(id: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($id: String) {
        featureCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            content {
              json
            }
            buttonsCollection {
              items {
                text
                url
              }
            }
            media {
              url
              title
              contentType
            }
          }
        }
      }
    `, 
      variables: {
        id
      },
    }),
  })

  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Feature data. Error: ", data)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  return normalizedData[0]
}