import getForm from './getForm';
import getFlexibleContent from './getFlexibleContent';
import normalizeContentfulData from './normalizeContentfulData';

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
            summary
            buttonsCollection {
              items {
                sys {
                  id
                }
                url
                buttonLabel
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
            blocksCollection (limit: 5) {
              items {
                __typename
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
                    buttonLabel
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
                ... on Form {
                  sys {
                    id
                  }
                }
                ... on Qa {
                  sys {
                    id
                  }
                  question
                  answer
                  isExpanded
                }
              }
            }
            alignment
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
            showBottomSeparator
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
    const normalizedData = normalizeContentfulData(data.data);

    normalizedData[0]?.blocks &&
      (await Promise.all(
        normalizedData[0]?.blocks.map(
          async (
            contentItem: { contentType: string; id: string },
            index: string | number,
          ) => {
            if (contentItem?.contentType === 'flexiblecontent') {
              normalizedData[0].blocks[index] = {
                ...contentItem,
                ...(await getFlexibleContent(contentItem.id)),
              };
            } else if (contentItem?.contentType === 'form') {
              normalizedData[0].blocks[index] = {
                ...contentItem,
                ...(await getForm(contentItem.id)),
              };
            } else {
              normalizedData[0].blocks[index] = { ...contentItem };
            }
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
