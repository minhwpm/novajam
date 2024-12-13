import { AlignmentType, ButtonType } from '@/helpers/types';
import classNames from 'classnames';
import { Button } from '../Button/Button';

export const ButtonGroup: React.FC<{
  data: Array<ButtonType>;
  alignment?: AlignmentType;
  size?: 'sm' | 'base' | 'lg';
  className?: string;
}> = ({ data, alignment, size, className }) => {
  return (
    <div
      className={classNames(
        'flex flex-row flex-wrap gap-6 lg:gap-8',
        { 'justify-center': alignment === 'center' },
        { 'justify-end': alignment === 'end' },
        className,
      )}
    >
      {data.map((button) => (
        <Button key={button.id} data={button} size={size ?? 'base'}>
          {button.label}
        </Button>
      ))}
    </div>
  );
};
