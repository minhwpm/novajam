import getForm from './getForm';
import normalizeContentfulData from './normalizeContentfulData';

export default async function getCTA(id: string) {
  try {
    const res = await fetch(
      `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
            query($id: String) {
              ctaCollection(
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
                  title
                  htmlid
                  displayTitle
                  eyebrow
                  summary
                  introAlignment
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
                  form {
                    sys {
                      id
                    }
                  }
                  layout
                  backgroundColor
                  backgroundImage {
                    url
                    title
                    width
                    height
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
        `Failed to fetch section CTA data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`,
      );
    }

    const data = await res.json();
    const normalizedData = normalizeContentfulData(data.data);
    if (normalizedData[0].form) {
      normalizedData[0].form = await getForm(normalizedData[0].form.sys.id);
    }
    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while fetching section CTA data: ${error}`,
    );
  }
}
