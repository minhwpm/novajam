import { Button } from '@/components/elements/Button/Button';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="container flex flex-wrap-reverse min-h-fit items-center justify-center">
      <div className="w-full lg:w-1/2 py-10">
        <div className="font-bold text-4xl lg:text-6xl text-primary-600 mb-6 lg:mb-8 dark:text-primary-500">
          Page Not Found
        </div>
        <div className="text-slate-600 dark:text-slate-300 lg:text-lg">
          <p>We’re sorry, the page you requested could not be found.</p>
          <p>Please go back to the homepage.</p>
        </div>
        <div className="mt-10">
          <Button
            data={{
              label: 'Go to Home page',
              href: '/',
              withArrow: false,
              variant: 'primary',
              openNewTab: false,
            }}
            size="lg"
          />
        </div>
      </div>
      <div className="w-1/2">
        <Image
          src="/404.webp"
          alt="404 Page Not Found"
          className="w-full"
          width="300"
          height="300"
        />
      </div>
    </section>
  );
}
