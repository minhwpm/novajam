
export default async function getHeader(slug: string) {
  fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      {
        pageCollection(
          where: { 
            slug: $slug
          } 
        ) {
          title
          slug
          contentCollection {
            items {
              __typename
              ... on Hero {
                title
                label
                spotlightText
                mediaCollection {
                  items {
                    __typename
                    title
                    url
                    width
                    height
                  }
                }
                mediaForMobileCollection {
                  items {
                    __typename
                    title
                    url
                    width
                    height
                  }
                }
                content {
                  json
                }
                buttonsCollection {
                  items {
                    text
                    url
                  }
                }
              }
              ... on Presentation {
                title
                label
                subtitle
                contentCollection {
                  items {
                    title
                    label
                    subtitle
                    content {
                      json
                    }
                  }
                }
                presentationType
              }
              ... on Cta {
                title
                content
                buttonsCollection {
                  items {
                    text
                    url
                  }
                }
              }
            }
          }
        }
      }
    ` }),
  })
}