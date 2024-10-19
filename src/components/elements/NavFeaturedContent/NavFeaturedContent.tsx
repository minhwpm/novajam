import { PageType } from '@/helpers/types';
import { PagePreview } from '../PagePreview/PagePreview';

export const NavFeaturedContent: React.FC<{
  data: PageType;
  onClick?: () => void;
}> = ({ data, onClick }) => {
  return (
    <div onClick={onClick} onKeyDown={onClick} role="link" tabIndex={0}>
      {data.contentType === 'page' && (
        <PagePreview data={data} alignment="center" />
      )}
    </div>
  );
};
