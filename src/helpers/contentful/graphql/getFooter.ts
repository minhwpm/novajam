import normalizeDataCollection from "./normalizeDataCollection"

export default async function getFooter(url: string) {
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
        footerCollection(
          where: { 
            url: $url
          } 
        ) {
          items {
            url
            logo {
              url
              title
            }
            logoRedirect
            copyright
            sns {
              linkedInUrl
              facebookUrl
              twitterUrl
              youtubeUrl
              instagramUrl
            }
            menuCollection (limit: 5) {
              items {
                title
                linksCollection (limit: 15) {
                  items {
                    sys {
                      id
                    }
                    text
                    openNewTab
                    url
                  }
                }
              }
            }
            backgroundColor
            darkMode
          }
        }
      }
    `,
      variables: {
        url,
      },
    }),
  })

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Header data')
  }
  
  const data = await res.json()
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`FOOTER DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}