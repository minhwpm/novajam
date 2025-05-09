import { BlogPostType } from '@/lib/types';

// Helper to process blog data
export function processBlogs(data: Array<BlogPostType | { total: number }>): {
  blogs: BlogPostType[];
  total: number;
} {
  const totalEntry = data.find(
    (item): item is { total: number } => 'total' in item,
  );
  const total = totalEntry?.total || 0;
  const blogs = data.filter((item): item is BlogPostType => !('total' in item));
  return { blogs, total };
}
