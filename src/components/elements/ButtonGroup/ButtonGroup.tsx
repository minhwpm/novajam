import classNames from 'classnames';
import { AlignmentType, ButtonType } from '@/lib/types';
import { Button } from '@/components/elements/Button/Button';

export const ButtonGroup: React.FC<{
  data: Array<ButtonType>;
  alignment?: AlignmentType;
  size?: 'sm' | 'base' | 'lg';
  className?: string;
  fullWidth?: boolean;
}> = ({ data, alignment, size, className, fullWidth }) => {
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
        <Button
          key={button.id}
          data={button}
          size={size ?? 'base'}
          fullWidth={fullWidth}
        />
      ))}
    </div>
  );
};
