import normalizeContentfulData from './normalizeContentfulData';

export default async function getForm(id: string) {
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
        formCollection(
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
            fieldsCollection {
              items {
                sys {
                  id
                }
                label
                fieldType
                options
                required
                placeholder
                helpText
                uiWidth
              }
            }
            submitButton {
              buttonLabel
              url
              buttonVariant
              withArrow
              icon {
                url
                title
                width
                height
              }
            }
            formType
            dateFormat
            successMessage
            errorMessage
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
        `Failed to fetch Form data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`,
      );
    }

    const data = await res.json();
    const normalizedData = normalizeContentfulData(data.data);
    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(`An error occurred while fetching Form data: ${error}`);
  }

  //@TODO something wrong with error catching in this file - when button field 'text' - 'buttonLabel' changing it doesn't show error
}
