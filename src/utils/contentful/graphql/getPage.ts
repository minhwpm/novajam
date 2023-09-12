import getCTA from "./getCTA"
import getCardList from "./getCardList"
import getFeature from "./getFeature"
import getHero from "./getHero"
import getPresentation from "./getPresentation"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getPage(slug: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($slug: String) {
        pageCollection(
          where: { 
            slug: $slug
          } 
        ) {
          items {
            title
            slug
            seo {
              metaTitle
              metaDescription
              sharedImage {
                title
                description
                url
              }
            }
            contentCollection {
              items {
                __typename
                ... on Hero {
                  sys {
                    id
                  }
                  title
                  spotlightTexts
                  label
                  style
                }
                ... on Presentation {
                  sys {
                    id
                  }
                  title
                  label
                  subtitle
                  style
                }
                ... on Feature {
                  sys {
                    id
                  }
                  title
                  label
                }
                ... on Cta {
                  sys {
                    id
                  }
                  title
                  content
                }
                ... on CardList {
                  sys {
                    id
                  }
                  title
                }
                ... on Testimonials {
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
        slug
      },
    }),
  })

  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Page data. Error", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})

  async function getSectionData(contentType: string, id: string) {
    if (contentType === "hero") {
      return await getHero(id)
    }
    if (contentType === "cta") {
      return await getCTA(id)
    }
    if (contentType === "presentation") {
      return await getPresentation(id)
    }
    if (contentType === "feature") {
      return await getFeature(id)
    }
    if (contentType === "cardlist") {
      return await getCardList(id)
    }
  }
  for(let i = 0; i < normalizedData[0].content.length; i++) {
    normalizedData[0].content[i] = {
      ... normalizedData[0].content[i],
      ... await getSectionData(normalizedData[0].content[i].contentType, normalizedData[0].content[i].id)
    }
  }
  // console.log(`PAGE DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}