import footers from './static-data/footers.json';

export default async function getPage(url: string) {
  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = footers.find((item) => item.url === url);
    return result;
  }
}
