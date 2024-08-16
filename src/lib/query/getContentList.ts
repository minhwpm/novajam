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
            heading {
              json
            }
            eyebrow
            summary {
              json
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
            enableParallaxBackground
            darkMode
            contentCollection (limit: 20) {
              items {
                __typename
                ... on Blog {
                  sys {
                    id
                    firstPublishedAt
                    publishedAt
                  }
                  title
                  slug
                  summary
                  content {
                    json
                  }
                  topics
                  media {
                    url
                    title
                    width
                    height
                    contentType
                  }
                }
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
                ... on Link {
                  sys {
                    id
                  }
                  text
                  image {
                    url
                    title
                    width
                    height
                    contentType
                  }
                  url
                  openNewTab
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
                  description {
                    json
                  }
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
                  content {
                    json
                  }
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

    normalizedData[0]?.content &&
      (await Promise.all(
        normalizedData[0]?.content.map(
          async (
            contentItem: { contentType: string; id: string },
            index: string | number
          ) => {
            if (contentItem?.contentType === "flexiblecontent") {
              const sectionData = await getFlexibleContent(contentItem.id);
              normalizedData[0].content[index] = {
                ...contentItem,
                ...sectionData,
              };
            } else {
              normalizedData[0].content[index] = { ...contentItem };
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
