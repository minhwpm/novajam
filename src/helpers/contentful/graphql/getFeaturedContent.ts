import getFlexibleContent from "./getFlexibleContent"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getFeature(id: string) {
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
        featureCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            content {
              sys {
                id
              }
              __typename
            }
            htmlid
            mediaAspectRatio
            appearanceVariant
            size
            backgroundColor
            backgroundImage {
              url
              title
              width
              height
              contentType
            }
            darkMode
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
    throw new Error("Failed to fetch Featured Content data. Error: ", data)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  if (normalizedData[0].content) {
    normalizedData[0].content = {
      ... await getFlexibleContent(normalizedData[0].content.sys.id)
    }
  }
  // console.log(`FEATURED CONTENT DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}