import getFlexibleContent from "./getFlexibleContent"
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
            appearanceVariant
            contentTextAlignment
            backgroundImage {
              url
              title
              width
              height
              contentType
            }
            darkMode
            contentCollection {
              items {
                __typename
                sys {
                  id
                }
                eyebrow
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
                    withArrow
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
      return await getFlexibleContent(id)
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