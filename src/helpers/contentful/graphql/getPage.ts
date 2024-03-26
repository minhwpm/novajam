import getCTA from "./getCTA"
import getContentList from "./getContentList"
import getFeaturedContent from "./getFeaturedContent"
import getHero from "./getHero"
import getInquiryForm from "./getInquiryForm"
import getContentPT from "./getContentPT"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getPage(url: string) {
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
        pageCollection(
          where: { 
            url: $url
          } 
        ) {
          items {
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
              contentType
            }
            fontMain
            fontHeading
            headingFontSize
            colorPrimary
            colorSecondary
            borderRadius
            contentCollection {
              items {
                __typename
                ... on Hero {
                  sys {
                    id
                  }
                }
                ... on Presentation {
                  sys {
                    id
                  }
                }
                ... on Feature {
                  sys {
                    id
                  }
                }
                ... on Cta {
                  sys {
                    id
                  }
                }
                ... on CardList {
                  sys {
                    id
                  }
                }
                ... on InquiryForm  {
                  sys {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `, 
      variables: {
        url
      },
    }),
    next: {
      revalidate: 10
    }
  })

  const data = await res.json()
  // console.log(`RAW PAGE DATA: ${JSON.stringify(data, null, 4)}`)
  if (res.status !== 200) {
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
      return await getContentPT(id)
    }
    if (contentType === "feature") {
      return await getFeaturedContent(id)
    }
    if (contentType === "cardlist") {
      return await getContentList(id)
    }
    if (contentType === "inquiryform") {
      return await getInquiryForm(id)
    }
  }
  for(let i = 0; i < normalizedData[0]?.content.length; i++) {
    normalizedData[0].content[i] = {
      ... normalizedData[0].content[i],
      ... await getSectionData(normalizedData[0].content[i]?.contentType, normalizedData[0].content[i]?.id)
    }
  }
  // console.log(`PAGE DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}