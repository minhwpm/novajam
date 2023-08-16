const contentful = require('contentful')

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "",
  accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN ?? ""
})
