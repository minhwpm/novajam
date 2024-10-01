import { getPage as getPagefromContentful } from './contentful/getPage';
import pages from './static-data/pages.json';

export default async function getPage(url: string) {
  if (process.env.DATA_SOURCE === 'CONTENTFUL') {
    return getPagefromContentful(url);
  }

  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = pages.find((item) => item.url === url);
    return result;
  }
}
