import { getBlogs as getBlogsfromContentful } from './contentful/getBlogs';
import blogs from './static-data/blogs.json';

export default async function getBlogs(
  limit?: number,
  skip?: number,
  featured?: boolean,
  topic?: string,
  excludeSlug?: string,
) {
  if (process.env.DATA_SOURCE === 'CONTENTFUL') {
    return getBlogsfromContentful(limit, skip, featured, topic, excludeSlug);
  }

  if (process.env.DATA_SOURCE === 'STATIC' || !process.env.DATA_SOURCE) {
    const result = blogs
      .filter((item) => {
        const isFeaturedMatch =
          featured !== undefined ? item.featured === featured : true;
        const isTopicMatch = topic ? item.topics.includes(topic) : true;
        return isFeaturedMatch && isTopicMatch;
      })
      .slice(skip ? skip - 1 : 0, limit);
    return result;
  }
}
