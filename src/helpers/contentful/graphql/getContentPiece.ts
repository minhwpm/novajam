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
            content {
              json
              links {
                entries {
                  block {
                    sys {
                      id
                    }
                    __typename
                    ... on Expert {
                      slug
                      fullName
                      role
                    }
                  }
                }
              }
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
    throw new Error("Failed to fetch Card List data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`CONTENT PIECE DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}