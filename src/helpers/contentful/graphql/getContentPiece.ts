import normalizeDataCollection from "./normalizeDataCollection"

export default async function getContentPiece(id: string) {
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
        contentPieceCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            sys {
              id
            }
            heading {
              json
            }
            label
            embeddedMediaUrl
            embeddedMediaTitle
            description {
              json
            }
            mediaCollection {
              items {
                url
                title
                width
                height
                contentType
              }
            }
            buttonsCollection {
              items {
                sys {
                  id
                }
                url
                text
                openNewTab
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
    next: {
      revalidate: 10
    }
  })
  const data = await res.json()
  // console.log(`RAW CONTENT PIECE DATA: ${JSON.stringify(data, null, 4)}`)
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Content Piece data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`CONTENT PIECE DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}