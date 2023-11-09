import normalizeDataCollection from "./normalizeDataCollection"

export default async function getHero(id: string) {
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
        heroCollection(
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
            label
            content {
              json
            }
            layout
            buttonsCollection {
              items {
                text
                url
                buttonVariant
              }
            }
            mediaCollection {
              items {
                title
                url
                width
                height
                contentType
              }
            }
            mediaForMobileCollection {
              items {
                title
                url
                width
                height
                contentType
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
  // console.log(`HERO DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]

}