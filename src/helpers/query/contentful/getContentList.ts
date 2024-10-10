import getFlexibleContent from './getFlexibleContent';
import getForm from './getForm';
import normalizeContentfulData from './normalizeContentfulData';

export default async function getContentList(id: string) {
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
                  htmlid
                  alignment
                  listVariant
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
                  marginTop
                  marginBottom
                  itemSize
                  blocksCollection (limit: 20) {
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
                        alignment
                        layout
                      }
                      ... on Statistics {
                        sys {
                          id
                        }
                        number
                        text
                        alignment
                        layout
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
                        alignment
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
                        alignment
                        layout
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
        `Failed to fetch ContentList data: ${
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
      `An error occurred while fetching contentList data: ${error}`,
    );
  }
}
