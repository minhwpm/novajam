import getFlexibleContent from "./getFlexibleContent";
import normalizeDataCollection from "./normalizeDataCollection";

export default async function getContentList(id: string) {
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
        contentListCollection(
          where: {
            sys: {
              id: $id
            }
          }
        ) {
          items {
            eyebrow
            displayTitle
            summary
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
            htmlid
            appearanceVariant
            size
            headingTextAlignment
            contentTextAlignment
            contentOrientation
            backgroundColor
            backgroundImage {
              url
              title
              width
              height
              contentType
            }
            darkMode
            sectionSeparator
            contentItemsCollection (limit: 20) {
              items {
                __typename
                ... on Expert {
                  sys {
                    id
                  }
                  fullName
                  role
                  organization
                  specialization
                  summary
                  sns {
                    linkedInUrl
                    facebookUrl
                    twitterUrl
                    youtubeUrl
                    instagramUrl
                  }
                  portrait {
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
                }
                ... on Statistics {
                  sys {
                    id
                  }
                  number
                  text
                }
                ... on FlexibleContent {
                  sys {
                    id
                  }
                }
                ... on PricingPlan {
                  sys {
                    id
                  }
                  title
                  pricing
                  pricingSuffix
                  badge
                  description
                  ctaButton {
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
                ... on Testimonial {
                  sys {
                    id
                  }
                  content
                  portrait {
                    url
                    title
                    width
                    height
                    contentType
                  }
                  name
                  role
                  rating
                }
                ... on Blog {
                  sys {
                    id
                    firstPublishedAt
                    publishedAt
                  }
                  title
                  slug
                  topics
                  media {
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
        `Failed to fetch ContentList data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`
      );
    }

    const data = await res.json();
    const normalizedData = normalizeDataCollection(data.data);

    normalizedData[0]?.contentItems &&
      (await Promise.all(
        normalizedData[0]?.contentItems.map(
          async (
            contentItem: { contentType: string; id: string },
            index: string | number
          ) => {
            if (contentItem?.contentType === "flexiblecontent") {
              const sectionData = await getFlexibleContent(contentItem.id);
              normalizedData[0].contentItems[index] = {
                ...contentItem,
                ...sectionData,
              };
            } else {
              normalizedData[0].contentItems[index] = { ...contentItem };
            }
          }
        )
      ));
    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while fetching contentList data: ${error}`
    );
  }
}
