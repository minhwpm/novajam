import getContentPiece from "./getContentPiece"
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
            layout
            alignment
            contentCollection {
              items {
                __typename
                sys {
                  id
                }
                label
                heading {
                  json
                }
                buttonsCollection {
                  items {
                    sys {
                      id
                    }
                    text
                    url
                    openNewTab
                    buttonVariant
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
    throw new Error("Failed to fetch Hero data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  async function getSectionData(contentType: string, id: string) {
    if (contentType === "contentpiece") {
      return await getContentPiece(id)
    }
  }
  for(let i = 0; i < normalizedData[0]?.content.length; i++) {
    normalizedData[0].content[i] = {
      ... normalizedData[0].content[i],
      ... await getSectionData(normalizedData[0].content[i].contentType, normalizedData[0].content[i].id)
    }
  }
  // console.log(`HERO DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]

}