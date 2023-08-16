import { client } from "./client"

export async function getPage(path?: string) {
  try {
    const entry = await client.getEntry({
      content_type: 'Page',
      slug: path
    })
    console.log("PAGE DATA", entry)
    return entry
  } catch (e) {
    console.error(e)
    return null
  }
}