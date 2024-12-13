import pages from './static-data/pages.json';

export async function getPage(url: string) {
  const result = pages.find((item) => item.url === url);
  return result;
}
