import { NavigationType } from '../types';
import { getNavigation as getNavigationfromContentful } from './contentful/getNavigation';
import navigations from './static-data/navigations.json';

export default async function getNavigation(url: string) {
  if (process.env.DATA_SOURCE === 'CONTENTFUL') {
    return getNavigationfromContentful(url);
  }

  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = navigations.find((item: NavigationType) => item.url === url);
    return result;
  }
}
