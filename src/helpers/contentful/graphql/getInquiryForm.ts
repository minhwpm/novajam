import normalizeDataCollection from "./normalizeDataCollection";

export default async function getInquiryForm(id: string) {
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
        inquiryFormCollection(
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
            heading {
              json
            }
            eyebrow
            summary
            description {
              json
            }
            fieldsCollection {
              items {
                sys {
                  id
                }
                label
                fieldType
                options
                required
                helpText
                uiWidth
              }
            }
            dateFormat
            submitButton {
              text
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
            successMessage
            errorMessage
            htmlid
            formType
            appearanceVariant
            backgroundColor
            backgroundImage {
              url
              title
              width
              height
            }
            darkMode
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
        `Failed to fetch InquiryForm data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`
      );
    }

    const data = await res.json();
    const normalizedData = normalizeDataCollection(data.data);
    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while fetching inquiryForm data: ${error}`
    );
  }
}
