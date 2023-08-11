// @TODO specify type for param data
export default function normalizeDataCollection (data: { [x: string]: any }) {
  for (let key in data) {
    if (key.includes("Collection")) {
      const normalizedKey = key.replace("Collection", "")
      data[normalizedKey] = data[key].items
      delete data[key]
      for (let i = 0; i < data[normalizedKey].length; i++) {
        normalizeDataCollection(data[normalizedKey][i])
      }
    }
  }
  return data[Object.keys(data)[0]]
}