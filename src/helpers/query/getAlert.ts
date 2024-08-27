import normalizeDataCollection from "./normalizeDataCollection"

export default async function getAlert(id: string) {
  try {
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
        alertCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            title
            icon {
              url
              title
              width
              height
              contentType
            }
            message {
              json
            }
            backgroundColor
            darkMode
            
          }
        }
      }
    `, 
      variables: {
        id
      },
    }),
  })
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      `Failed to fetch Alert data: ${
        errorData.errors?.[0]?.message || res.statusText
      }`
    );
  }

  const data = await res.json();
  const normalizedData = normalizeDataCollection(data.data);
  return normalizedData[0]
} catch (error) {
  console.error(error);
  throw new Error(`An error occurred while fetching hero data: ${error}`);
}
}