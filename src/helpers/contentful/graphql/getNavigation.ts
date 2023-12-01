import getSubmenu from "./getSubmenu"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getNavigation(url: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($url: String) {
        navigationCollection(
          where: { 
            url: $url
          } 
        ) {
          items {
            url
            logo {
              url
              title
              width
              height
            }
            logoRedirect
            menuCollection {
              items {
                __typename
                ... on Link {
                  sys {
                    id
                  }
                  text
                  openNewTab
                  url
                }
                ... on Submenu {
                  sys {
                    id
                  }
                  title
                  layout
                }
              }
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
            uiVariant
          }
        }
      }
    `,
      variables: {
        url,
      },
   }),
  })

  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)    
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Navigation data')
  }
  const normalizedData = normalizeDataCollection({...data.data})

  for (let i = 0; i < normalizedData[0]?.menu.length; i++) {
    if (normalizedData[0].menu[i].contentType === "submenu") {
      normalizedData[0].menu[i] = {
        ... normalizedData[0].menu[i],
        ... await getSubmenu(normalizedData[0].menu[i].id)
      }
    }
  }
  // console.log(`NAVIGATION DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}