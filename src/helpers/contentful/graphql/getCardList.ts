import getContentPiece from "./getContentPiece"
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
            heading {
              json
            }
            label
            subtitle
            link {
              url
              text
              newTab
            }
            htmlid
            layout
            size
            alignment
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
                    contentType
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
                ... on ContentPiece {
                  sys {
                    id
                  }
                  label
                  heading {
                    json
                  }
                  content {
                    json
                  }
                  buttonsCollection {
                    items {
                      sys {
                        id
                      }
                      url
                      text
                      newTab
                      buttonVariant
                    }
                  }
                }
                ... on PricingPlan {
                  sys {
                    id
                  }
                  title
                  pricing
                  pricingSuffix
                  badge
                  features
                  ctaButton {
                    url
                    text
                    newTab
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
  // console.log(`RAW CARD LIST DATA: ${JSON.stringify(data, null, 4)}`)
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Card List data. Error: ", data.error)
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
  // console.log(`CARD LIST DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}