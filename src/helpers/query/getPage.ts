import { getPage as getPagefromContentful } from './contentful/getPage';
import pages from './static-data/pages.json';
import { PageType } from '../types';

export default async function getPage(url: string) {
  if (process.env.DATA_SOURCE === 'CONTENTFUL') {
    return getPagefromContentful(url);
  }

  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = pages.find((item: PageType) => item.url === url);
    return result;
  }
}
