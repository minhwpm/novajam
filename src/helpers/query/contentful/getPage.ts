import getContentList from './getContentList';
import getFeaturedContent from './getFeaturedContent';
import getHero from './getHero';
import getContentPT from './getContentPT';
import normalizeContentfulData from './normalizeContentfulData';
import getAlert from './getAlert';

export async function getPage(url: string) {
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
                ... on ContentPresentation {
                  sys {
                    id
                  }
                }
                ... on FeaturedContent {
                  sys {
                    id
                  }
                }
                ... on ContentList {
                  sys {
                    id
                  }
                }
                ... on Alert {
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
            url,
          },
        }),
        next: {
          revalidate: 10,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch Page data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`,
      );
    }
    const data = await res.json();
    const normalizedData = normalizeContentfulData(data.data);

    const getSectionData = async (contentType: string, id: string) => {
      switch (contentType) {
        case 'hero':
          return await getHero(id);
        case 'contentpresentation':
          return await getContentPT(id);
        case 'featuredcontent':
          return await getFeaturedContent(id);
        case 'contentlist':
          return await getContentList(id);
        case 'alert':
          return await getAlert(id);
        default:
          return null;
      }
    };

    normalizedData[0]?.content &&
      (await Promise.all(
        normalizedData[0]?.content.map(
          async (
            contentItem: { contentType: string; id: string },
            index: string | number,
          ) => {
            const sectionData = await getSectionData(
              contentItem?.contentType,
              contentItem?.id,
            );
            normalizedData[0].content[index] = {
              ...(contentItem ? contentItem : {}),
              ...(sectionData ? sectionData : {}),
            };
          },
        ),
      ));

    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(`An error occurred while fetching page data: ${error}`);
  }
}
