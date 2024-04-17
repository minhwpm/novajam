import normalizeDataCollection from "./normalizeDataCollection"

export default async function getInquiryForm(id: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
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
        id
      },
    }),
  })

  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Inquiry Form data. Error: ", data)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  return normalizedData[0]
}