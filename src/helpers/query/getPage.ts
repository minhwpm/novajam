import pages from './static-data/pages.json';

export default async function getPage(url: string) {
  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = pages.find((item) => item.url === url);
    return result;
  }
}
