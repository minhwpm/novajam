import getLinkGroup from "./getLinkGroup";
import normalizeDataCollection from "./normalizeDataCollection";

export default async function getSubmenu(id: string) {
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
        submenuCollection (
          where: { 
            sys: { 
              id: $id
            }
          }
        ) {
          items {
            title
            appearanceVariant
            menuCollection {
              items {
                __typename
                ... on Link {
                  sys {
                    id
                  }
                  text
                  url
                  openNewTab
                }
                ... on LinkGroup  {
                  sys {
                    id
                  }
                  title
                }
              }
            }
            featuredContentCollection {
              items {
                __typename
                ... on Blog {
                  sys {
                    id
                  }
                  title
                  slug
                  media {
                    url
                    title
                    width
                    height
                    contentType
                  }
                }
                ... on Page {
                  sys {
                    id
                  }
                  title
                  url
                  metaImage {
                    url
                    title
                    width
                    height
                    contentType
                  }
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
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch Submenu data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`
      );
    }

    const data = await res.json();
    const normalizedData = normalizeDataCollection(data.data);

    for (let i = 0; i < normalizedData[0].menu.length; i++) {
      if (normalizedData[0].menu[i]?.contentType === "linkgroup") {
        normalizedData[0].menu[i] = {
          ...normalizedData[0].menu[i],
          ...(await getLinkGroup(normalizedData[0].menu[i].id)),
        };
      }
    }
    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while fetching submenu data: ${error}`
    );
  }
}
