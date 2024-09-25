import { Button } from '@/components/elements/Button/Button';
import { Container } from '@/components/elements/Container/Container';
import Image from 'next/image';

export default function NotFound() {
  return (
    <Container className="flex flex-wrap-reverse min-h-fit items-center justify-center">
      <div className="w-full lg:w-1/2 py-10">
        <div className="font-bold text-4xl lg:text-6xl text-primary-600 mb-5">
          Page Not Found
        </div>
        <div className="text-slate-500 lg:text-lg">
          <p>We’re sorry, the page you requested could not be found.</p>
          <p>Please go back to the homepage.</p>
        </div>
        <div className="mt-10">
          <Button
            data={{
              buttonLabel: 'Go to Home page',
              url: '/',
              withArrow: false,
              buttonVariant: 'primary',
              openNewTab: false,
            }}
            size="lg"
          />
        </div>
      </div>
      <div className="w-1/2">
        <Image
          src="/404.png"
          alt="404 Page Not Found"
          className="w-full"
          width="300"
          height="300"
        />
      </div>
    </Container>
  );
}
