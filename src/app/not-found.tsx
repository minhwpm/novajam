import { Button } from '@/components/elements/Button/Button';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="container py-10 flex flex-wrap-reverse lg:min-h-screen items-center justify-center">
      <div className="basis-full md:basis-1/2">
        <div className="font-semibold text-4xl lg:text-5xl text-slate-800 mb-6 lg:mb-8 dark:text-slate-100">
          Page Not Found
        </div>
        <p className="prose lg:prose-lg text-slate-500 dark:text-slate-100/60">
          The page you requested doesn&#39;t exist. Please check to see if it
          was entered correctly or head back to our homepage.
        </p>
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
      <div className="basis-full  md:basis-1/2">
        <Image
          src="/404.webp"
          alt="404 Page Not Found"
          className="w-full h-full"
          width="300"
          height="300"
        />
      </div>
    </section>
  );
}
