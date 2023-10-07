import normalizeDataCollection from "./normalizeDataCollection"

export default async function getPresentation(id: string) {
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
        presentationCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            contentCollection (limit: 20) {
              items {
                title
                label
                content {
                  json
                }
                buttonsCollection {
                  items {
                    sys {
                      id
                    }
                    text
                    url
                  }
                }
                mediaCollection (limit: 1) {
                  items {
                    sys {
                      id
                    }
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
    throw new Error("Failed to fetch Presentation data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  return normalizedData[0]

}