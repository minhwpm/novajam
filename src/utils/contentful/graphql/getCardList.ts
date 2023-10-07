import normalizeDataCollection from "./normalizeDataCollection"

export default async function getCardList(id: string) {
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
        cardListCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            title
            label
            subtitle
            link {
              url
              text
              newTab
            }
            layout
            size
            contentCollection (limit: 20) {
              items {
                __typename
                ... on Blog {
                  sys {
                    id
                  }
                  title
                  slug
                  summary
                  topics
                  media {
                    url
                    title
                    width
                    height
                  }
                }
                ... on Feature {
                  sys {
                    id
                  }
                  title
                  label
                  content {
                    json
                  }
                  mediaCollection (limit: 1) {
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
                    }
                  }
                }
                ... on Product {
                  sys {
                    id
                  }
                  title
                  slug
                  price
                  categories
                  mediaCollection (limit: 1) {
                    items {
                      url
                      title
                    }
                  }
                }
                ... on Expert {
                  sys {
                    id
                  }
                  fullName
                  slug
                  role
                  organization
                  specialization
                  summary
                  portrait {
                    url
                    title
                    width
                    height
                  }
                }
                ... on Page {
                  sys {
                    id
                  }
                  title
                  url
                  metaTitle
                  metaDescription
                  metaKeywords
                  metaImage {
                    url
                    title
                    width
                    height
                  }
                }
                ... on Link {
                  sys {
                    id
                  }
                  text
                  image {
                    url
                    title
                    width
                    height
                  }
                  url
                  newTab
                }
                ... on Statistics {
                  sys {
                    id
                  }
                  number
                  text
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
    throw new Error("Failed to fetch Card List data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  console.log(`CARD LIST DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}