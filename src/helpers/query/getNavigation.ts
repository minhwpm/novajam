import navigations from './static-data/navigations.json';

export default async function getNavigation(url: string) {
  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = navigations.find((item) => item.url === url);
    return result;
  }
}
