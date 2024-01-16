import getFlexibleContent from "./getFlexibleContent"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getContentPT(id: string) {
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
            heading {
              json
            }
            eyebrow
            summary {
              json
            }
            layout
            alignment
            htmlid
            backgroundColor
            backgroundImage {
              url
              title
              width
              height
              contentType
            }
            contentCollection (limit: 20) {
              items {
                __typename
                ... on ContentPiece {
                  sys {
                    id
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
    throw new Error("Failed to fetch ContentPT data. Error: ", data.error)
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
  // console.log(`ContentPT DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]

}