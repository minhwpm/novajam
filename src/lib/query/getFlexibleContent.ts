import normalizeDataCollection from "./normalizeDataCollection"

export default async function getFlexibleContent(id: string) {
  try {
    const res = await fetch(
      `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
        },
        // send the GraphQL query
        body: JSON.stringify({
          query: `
      query($id: String) {
        flexibleContentCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            sys {
              id
            }
            heading {
              json
            }
            eyebrow
            embeddedMediaUrl
            embeddedMediaTitle
            description {
              json
            }
            mediaCollection {
              items {
                sys {
                  id
                }
                url
                title
                width
                height
                contentType
              }
            }
            buttonsCollection {
              items {
                sys {
                  id
                }
                url
                text
                openNewTab
                buttonVariant
                withArrow
                icon {
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
            id,
          },
        }),
        next: {
          revalidate: 10,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch FlexibleContent data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`
      );
    }

    const data = await res.json();
    const normalizedData = normalizeDataCollection(data.data);
    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(`An error occurred while fetching flexibleContent data: ${error}`);
  }
}