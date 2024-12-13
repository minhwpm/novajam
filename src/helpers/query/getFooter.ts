import footers from './static-data/footers.json';

export async function getFooter(url: string) {
  const result = footers.find((item) => item.url === url);
  return result;
}
