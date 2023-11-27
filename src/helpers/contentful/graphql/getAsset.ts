import normalizeDataCollection from "./normalizeDataCollection"

export default async function getAsset(id: string) {
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
        assetCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            title
            url
            width
            height
            contentType
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
    throw new Error("Failed to fetch Blog data. Error", data.error)
  }
  // console.log(`ASSET RAW DATA: ${JSON.stringify(data, null, 4)}`)

  const normalizedData = normalizeDataCollection({...data.data})

  // console.log(`ASSET DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}