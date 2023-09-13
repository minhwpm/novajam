import getLinkGroup from "./getLinkGroup"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getSubmenu(id: string) {
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
        submenuCollection (
          where: { 
            sys: { 
              id: $id
            }
          }
        ) {
          items {
            title
            style
            menuCollection {
              items {
                __typename
                ... on Link {
                  sys {
                    id
                  }
                  text
                  url
                  newTab
                }
                ... on LinkGroup  {
                  sys {
                    id
                  }
                  title
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
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Submenu data', data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})

  for (let i = 0; i < normalizedData[0].menu.length; i++) {
    if (normalizedData[0].menu[i].contentType === "linkgroup") {
      normalizedData[0].menu[i] = {
        ... normalizedData[0].menu[i],
        ... await getLinkGroup(normalizedData[0].menu[i].id)
      }
    }
  }
  // console.log(`SUBMENU DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}