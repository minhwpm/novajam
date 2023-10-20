import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

// @TODO specify type for param data
export default function normalizeDataCollection (data: { [x: string]: any }) {
  for (const key in data) {
    if (key.includes("Collection")) {
      const normalizedKey = key.replace("Collection", "")
      data[normalizedKey] = data[key].items
      delete data[key]
      for (let i = 0; i < data[normalizedKey].length; i++) {
        normalizeDataCollection(data[normalizedKey][i])
      }
    }
    if (key === "sys") {
      data.id = data.sys.id
      delete data.sys
    }
    if (key === "__typename") {
      data.contentType = data.__typename.toLowerCase()
      delete data.__typename
    }
    if (data[key] && typeof data[key] === "object" && "json" in data[key]) {
      data[key] = documentToHtmlString(data[key].json)
      delete data[key].json
    }
  }
  return data[Object.keys(data)[0]]
}