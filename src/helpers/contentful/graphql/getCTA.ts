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
            heading {
              json
            }
            content
            buttonsCollection {
              items {
                sys {
                  id
                }
                text
                url
                buttonVariant
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
    console.error(data.error)
    throw new Error("Failed to fetch CTA data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`CTA DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}