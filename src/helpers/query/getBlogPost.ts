import { getBlogPost as getBlogPostFromContentful } from './contentful/getBlogPost';
import blogs from './static-data/blogs.json';

export default async function getBlogPost(slug: string) {
  if (process.env.DATA_SOURCE === 'CONTENTFUL') {
    return getBlogPostFromContentful(slug);
  }

  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = blogs.find((item) => item.slug === slug);
    return result;
  }
}
