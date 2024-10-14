import { FooterType } from '../types';
import { getFooter as getFooterfromContentful } from './contentful/getFooter';
import footers from './static-data/footers.json';

export default async function getPage(url: string) {
  if (process.env.DATA_SOURCE === 'CONTENTFUL') {
    return getFooterfromContentful(url);
  }

  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = footers.find((item: FooterType) => item.url === url);
    return result;
  }
}
