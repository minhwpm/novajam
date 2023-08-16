import normalizeDataCollection from "./normalizeDataCollection"

export default async function getCTA(id: string) {
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
        ctaCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            buttonsCollection {
              items {
                text
                url
              }
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
    throw new Error("Failed to fetch Hero data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  return normalizedData[0]

}