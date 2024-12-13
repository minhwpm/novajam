import navigations from './static-data/navigations.json';

export async function getNavigation(url: string) {
  const result = navigations.find((item) => item.url === url);
  return result;
}
