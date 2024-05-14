import normalizeDataCollection from "./normalizeDataCollection"

export default async function getFlexibleContent(id: string) {
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
        flexibleContentCollection(
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
            eyebrow
            embeddedMediaUrl
            embeddedMediaTitle
            description {
              json
            }
            mediaCollection {
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
            buttonsCollection {
              items {
                sys {
                  id
                }
                url
                text
                openNewTab
                buttonVariant
                withArrow
                icon {
                  url
                  title
                  width
                  height
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
    next: {
      revalidate: 10
    }
  })
  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Content Piece data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`CONTENT PIECE DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}