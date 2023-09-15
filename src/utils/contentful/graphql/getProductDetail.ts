import normalizeDataCollection from "./normalizeDataCollection"

export default async function getProductDetail(slug: string) {
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
        productCollection(
          where: { 
            slug: $slug
          } 
        ) {
          items {
            sys {
              id
            }
            title
            slug
            categories
            inStock
            price
            mediaCollection {
              items {
                title
                url
                width
                height
              }
            }
            summary {
              json
            }
            content {
              json
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
    throw new Error("Failed to fetch Product data. Error", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})

  // async function getSectionData(contentType: string, id: string) {
  //   if (contentType === "hero") {
  //     return await getHero(id)
  //   }
  //   if (contentType === "cta") {
  //     return await getCTA(id)
  //   }
  //   if (contentType === "presentation") {
  //     return await getPresentation(id)
  //   }
  //   if (contentType === "feature") {
  //     return await getFeature(id)
  //   }
  //   if (contentType === "cardlist") {
  //     return await getCardList(id)
  //   }
  // }
  // for(let i = 0; i < normalizedData[0].content.length; i++) {
  //   normalizedData[0].content[i] = {
  //     ... normalizedData[0].content[i],
  //     ... await getSectionData(normalizedData[0].content[i].contentType, normalizedData[0].content[i].id)
  //   }
  // }
  console.log(`PRODUCT DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}