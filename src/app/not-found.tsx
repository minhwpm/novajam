import { Button } from "@/components/elements/Button/Button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mx-auto p-4 flex flex-col max-w-3xl justify-center items-center pt-32 pb-20 min-h-screen">
      <div className="font-bold text-7xl lg:text-9xl text-primary-600 mb-5">404</div>
      <Image src="/404.png" alt="404 Page Not Found" width="500" height="500"/>
      <div className="text-neutral-500 lg:text-lg text-center">
        <p>We’re sorry, the page you requested could not be found.</p>
        <p>Please go back to the homepage.</p>
      </div>
      <div className="mt-10">
        <Button
          data={{
            text: "Go to Home page",
            url: "/",
            withArrow: false,
            buttonVariant: "primary",
            openNewTab: false,
          }}
          size="lg"
        />
      </div>
    </div>
  );
}