import getFlexibleContent from './getFlexibleContent';
import normalizeDataCollection from './normalizeDataCollection';

export default async function getContentPT(id: string) {
  try {
    const res = await fetch(
      `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authenticate the request
          Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
        },
        // send the GraphQL query
        body: JSON.stringify({
          query: `
      query($id: String) {
        contentPresentationCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            eyebrow
            displayTitle
            description
            layout
            headingTextAlignment
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
            itemTextAlignment
            htmlid
            backgroundColor
            backgroundImage {
              url
              title
              width
              height
              contentType
            }
            enableParallaxEffect
            darkMode
            sectionSeparator
            contentItemsCollection (limit: 20) {
              items {
                __typename
                ... on FlexibleContent {
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
            id,
          },
        }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch ContentPT data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`,
      );
    }

    const data = await res.json();
    const normalizedData = normalizeDataCollection(data.data);

    normalizedData[0]?.content &&
      (await Promise.all(
        normalizedData[0]?.contentItems.map(
          async (
            contentItem: { contentType: string; id: string },
            index: string | number,
          ) => {
            const sectionData = await getFlexibleContent(contentItem.id);
            normalizedData[0].contentItems[index] = {
              ...contentItem,
              ...sectionData,
            };
          },
        ),
      ));

    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while fetching contentPT data: ${error}`,
    );
  }
}
