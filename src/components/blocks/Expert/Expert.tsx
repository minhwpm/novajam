/* eslint-disable complexity */ //@TODO eslint
'use client';
import classNames from 'classnames';
import { ExpertType } from '@/helpers/types';
import { SNS } from '@/components/elements/SNS/SNS';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

export const Expert: React.FC<{
  index?: number;
  data: ExpertType;
  animate?: boolean;
  customLayout?: 'vertical' | 'horizontal';
}> = ({ index, data, animate, customLayout }) => {
  const {
    fullName,
    portrait,
    role,
    specialization,
    organization,
    summary,
    sns,
  } = data;
  const layout = customLayout ?? data.layout ?? 'vertical';
  const alignment = data.alignment ?? 'center';

  const [ref, isIntersecting] = useIntersecting();

  if (layout === 'horizontal') {
    return (
      <div
        ref={ref}
        className={classNames(
          'flex flex-wrap gap-y-4 justify-center rounded-theme',
          {
            'relative -bottom-10 opacity-0': animate,
            'animate-slidingUpContent': isIntersecting && animate,
          },
        )}
        style={{
          animationDelay: index && animate ? `${(index + 1) * 0.15}s` : '0s',
        }}
      >
        <div className="w-1/2 sm:w-1/3 md:w-1/4">
          <MediaItem data={portrait} aspectRatio="square" rounded="full" />
        </div>
        <div className="w-full sm:w-2/3 md:w-3/4 sm:pl-4 md:pl-6 lg:pl-8">
          <div
            className={classNames(
              'font-heading font-semibold text-2xl md:text-3xl text-center sm:text-start mb-2 dark:text-slate-100',
            )}
          >
            {fullName}
          </div>
          {role && (
            <div
              className={classNames(
                'font-semibold text-center sm:text-start text-slate-500 dark:text-slate-100/70',
              )}
            >
              {role}
            </div>
          )}
          {specialization && (
            <div
              className={classNames(
                'flex flex-wrap items-center gap-2 justify-center sm:justify-start text-slate-500 dark:text-slate-100/70',
              )}
            >
              {specialization.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          )}
          {organization && (
            <div
              className={classNames(
                'text-center sm:text-start text-slate-500 dark:text-slate-100/70',
              )}
            >
              {organization}
            </div>
          )}
          {summary && (
            <div
              className={classNames(
                'my-4 prose 2xl:prose-lg max-w-none dark:text-slate-100',
              )}
            >
              {summary}
            </div>
          )}
          {sns && <SNS data={sns} />}
        </div>
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={classNames('group rounded-theme', {
        'relative -bottom-10 opacity-0': animate,
        'animate-slidingUpContent': isIntersecting && animate,
      })}
      style={{
        animationDelay: index && animate ? `${(index + 1) * 0.15}s` : '0s',
      }}
    >
      <div
        className={classNames('relative flex', {
          'justify-center': alignment === 'center',
          'justify-end': alignment === 'end',
        })}
      >
        <MediaItem data={portrait} aspectRatio="square" />
        {summary && (
          <div
            className={classNames(
              'absolute bottom-0 opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-in-out rounded-b-theme gr p-4 text-slate-100 bg-primary-600 prose',
            )}
          >
            <div className="line-clamp-5">{summary}</div>
          </div>
        )}
      </div>
      <div
        className={classNames(
          'w-full px-4 pt-4 pb-6 flex flex-col gap-1 rounded-b-theme',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        <div
          className={classNames(
            'font-heading font-semibold text-lg xl:text-xl dark:text-slate-100',
          )}
        >
          {fullName}
        </div>
        {role && (
          <div className={classNames('text-slate-500 dark:text-slate-100/70')}>
            {role}
          </div>
        )}
        {specialization && (
          <div
            className={classNames(
              'flex flex-wrap gap-2 text-slate-500 dark:text-slate-100/70',
              {
                'justify-center': alignment === 'center',
                'justify-end': alignment === 'end',
              },
            )}
          >
            {specialization.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        )}
        {organization && (
          <div className={classNames('text-slate-500 dark:text-slate-100/70')}>
            {organization}
          </div>
        )}
        {sns && (
          <div
            className={classNames('flex', {
              'justify-center': alignment === 'center',
              'justify-end': alignment === 'end',
            })}
          >
            <SNS data={sns} />
          </div>
        )}
      </div>
    </div>
  );
};
