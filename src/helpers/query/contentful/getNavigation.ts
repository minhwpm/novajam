import getSubmenu from './getSubmenu';
import normalizeContentfulData from './normalizeContentfulData';

export async function getNavigation(url: string) {
  if (process.env.DATA_SOURCE === 'CONTENTFUL') {
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
        navigationCollection(
          where: { 
            url: $url
          } 
        ) {
          items {
            url
            logo {
              sys {
                id
              }
              url
              title
              width
              height
              contentType
            }
            logoRedirect
            menuCollection {
              items {
                __typename
                ... on Link {
                  sys {
                    id
                  }
                  text
                  openNewTab
                  url
                }
                ... on Submenu {
                  sys {
                    id
                  }
                  title
                }
              }
            }
            showModeSelector
            buttonsCollection {
              items {
                sys {
                  id
                }
                buttonLabel
                url
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
            hotButtonsCollection {
              items {
                sys {
                  id
                }
                buttonLabel
                url
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
            layout
            darkMode
          }
        }
      }
    `,
            variables: {
              url,
            },
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `Failed to fetch Navigation data: ${
            errorData.errors?.[0]?.message || res.statusText
          }`,
        );
      }

      const data = await res.json();
      const normalizedData = normalizeContentfulData(data.data);

      normalizedData[0]?.menu &&
        (await Promise.all(
          normalizedData[0]?.menu.map(
            async (
              menuItem: { contentType: string; id: string },
              index: string | number,
            ) => {
              if (menuItem.contentType === 'submenu') {
                const submenuData = await getSubmenu(menuItem.id);
                normalizedData[0].menu[index] = { ...menuItem, ...submenuData };
              }
            },
          ),
        ));

      return normalizedData[0];
    } catch (error) {
      console.error(error);
      throw new Error(
        `An error occurred while fetching navigation data: ${error}`,
      );
    }
  }
}
