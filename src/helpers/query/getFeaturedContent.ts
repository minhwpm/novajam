import getFlexibleContent from './getFlexibleContent';
import normalizeDataCollection from './normalizeDataCollection';

export default async function getFeature(id: string) {
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
        featuredContentCollection(
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
            itemsCollection (limit: 5) {
              items {
                sys {
                  id
                }
              }
            }
            mediaCollection (limit: 50) {
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
            mediaPosition
            mediaAspectRatio
            htmlid
            layout
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
        `Failed to fetch FeaturedContent data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`,
      );
    }

    const data = await res.json();
    const normalizedData = normalizeDataCollection(data.data);

    normalizedData[0]?.items &&
      (await Promise.all(
        normalizedData[0]?.items.map(
          async (
            item: { contentType: string; id: string },
            index: string | number,
          ) => {
            const sectionData = await getFlexibleContent(item.id);
            normalizedData[0].items[index] = { ...item, ...sectionData };
          },
        ),
      ));

    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while fetching featuredContent data: ${error}`,
    );
  }
}
