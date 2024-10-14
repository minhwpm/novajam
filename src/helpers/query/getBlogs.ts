import { BlogType } from '../types';
import blogs from './static-data/blogs.json';

export default async function getBlogs(
  limit?: number,
  skip?: number,
  featured?: boolean,
  topic?: string,
  _excludeSlug?: string,
) {
  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = blogs
      .filter((item: BlogType) => {
        const isFeaturedMatch =
          featured !== undefined ? item.featured === featured : true;
        const isTopicMatch = topic ? item.topics.includes(topic) : true;
        return isFeaturedMatch && isTopicMatch;
      })
      .slice(skip ? skip - 1 : 0, limit);
    return result;
  }
}
