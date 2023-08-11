import { HeaderProps } from "@/utils/types"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getHeader(name: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($name: String) {
        headerCollection(
          where: { 
            title: $name
          } 
        ) {
          items {
            title
            logo {
              url
              title
            }
            menuCollection (limit: 5) {
              items {
                __typename
                ... on Link {
                  text
                  newTab
                  url
                }
                ... on Submenu {
                  title
                  menuCollection (limit: 3) {
                    items {
                      title
                      linksCollection (limit: 5) {
                        items {
                          text
                          newTab
                          url
                        }
                      }
                    }
                  }
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

  // console.log(res)

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Header data')
  }
  
  const data = await res.json()
  const normalizedData = normalizeDataCollection({...data.data})
  return normalizedData[0]
}