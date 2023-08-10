
export default async function getHeader(name: string) {
  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      {
        headerCollection(
          where: { 
            title: "Celestial"
          } 
        ) {
          items {
            title
            logo {
              url
              title
            }
            menuCollection {
              items {
                __typename
                ... on Link {
                  text
                  newTab
                  url
                }
                ... on Submenu {
                  title
                  
                }
              }
            }
            buttonsCollection {
              items {
                text
                url
                newTab
                buttonType
              }
            }
          }
        }
      }
    ` }),
  })

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch Header data')
  // }
  
  const data = await res.json()
  const result = {
    logo: {},
    menu: [],
    buttons: []
  }
  result.logo = data.data.headerCollection.items[0].logo
  result.menu = data.data.headerCollection.items[0].menuCollection.items
  result.buttons = data.data.headerCollection.items[0].buttonsCollection.items
  return result
}