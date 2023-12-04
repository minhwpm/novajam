import normalizeDataCollection from "./normalizeDataCollection"

export default async function getLinkGroup(id: string) {
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
        linkGroupCollection (
          where: { 
            sys: { 
              id: $id
            }
          }
        ) {
          items {
            title
            linksCollection {
              items {
                sys {
                  id
                }
                text
                url
                openNewTab
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
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch LinkGroup data', data.error)
  }
  
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`LinkGroup DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}