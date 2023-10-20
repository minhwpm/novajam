import normalizeDataCollection from "./normalizeDataCollection"

export default async function getTestimonials(id: string) {
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
        testimonialsCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            contentCollection (limit: 20) {
              items {
                sys {
                  id
                }
                title
                content
                witnessFullname
                witnessRole
                witnessOrganization
                witnessPortrait {
                  url
                  title
                  width
                  height
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
    throw new Error("Failed to fetch Presentation data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  return normalizedData[0]

}