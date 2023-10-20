import normalizeDataCollection from "./normalizeDataCollection"

export default async function getCardList(id: string) {
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
        galleryCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            title
            heading {
              json
            }
            label
            subtitle
            layout
            contentCollection {
              items {
                sys {
                  id
                }
                url
                title
                width
                height
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
    console.error(data)
    throw new Error("Failed to fetch Card List data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`CARD LIST DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}