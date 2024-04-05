import getAsset from "./getAsset"
import getFlexibleContent from "./getFlexibleContent"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getBlogDetails(slug: string) {
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
        blogCollection (
          where: { 
            slug: $slug
          } 
        ) {
          items {
            sys {
              id
              firstPublishedAt
              publishedAt
            }
            title
            slug
            media {
              title
              url
              width
              height
              contentType
            }
            summary
            content {
              json
            }
            topics
            author {
              sys {
                id
              }
              fullName
              portrait {
                url
                title
                width
                height
                contentType
              }
              role
              specialization
              organization
              summary
            }
            metaTitle
            metaDescription
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
    throw new Error("Failed to fetch Blog data. Error", data.error)
  }
  // console.log(`BLOG RAW DATA: ${JSON.stringify(data, null, 4)}`)
  // async function getSectionData(contentType: string, id: string) {
    
  //   if (contentType === "inquiryform") {
  //     return await getInquiryForm(id)
  //   }
  // }

  const richtextContent = data.data.blogCollection.items[0].content.json.content
  for(let i = 0; i < richtextContent.length; i++) {
    if (richtextContent[i].nodeType === "embedded-asset-block") {
      richtextContent[i].data = {
        ... richtextContent[i].data,
        ... await getAsset(richtextContent[i].data.target.sys.id)
      }
    }
    if (richtextContent[i].nodeType === "embedded-entry-block") {
      richtextContent[i].data = {
        ... richtextContent[i].data,
        // ... await getEntry()
        ... await getFlexibleContent(richtextContent[i].data.target.sys.id)
      }
    }
  }
  // console.log(`BLOG RAW DATA: ${JSON.stringify(data, null, 4)}`)
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`BLOG DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}