declare module 'react-responsive-masonry' {
  import { CSSProperties } from 'react';

  const Masonry: React.FC<{
    columnsCount?: number;
    gutter?: string;
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
  }>;

  export const ResponsiveMasonry: React.FC<{
    columnsCountBreakPoints?: Record<number, number>;
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
  }>;

  export default Masonry;
}
