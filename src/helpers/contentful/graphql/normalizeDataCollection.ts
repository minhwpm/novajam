import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, Block, Inline } from "@contentful/rich-text-types";

const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      if (node.data.contentType.includes('image')) {
        return `<img src='${node.data.url}' width=${node.data.width} height=${node.data.height} alt='${node.data.title}' />`
      }
      if (node.data.contentType.includes('video')) {
        return `<video src='${node.data.url}' caption=${node.data.title} controls />`
      }
      return ''
    }
  },
};

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
      data[key] = documentToHtmlString(data[key].json, richTextOptions )
      delete data[key].json
    }
  }
  return data ? data[Object.keys(data)[0]] : null
}