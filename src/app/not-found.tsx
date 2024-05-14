import { Button } from "@/components/elements/Button/Button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mx-auto p-4 flex flex-col max-w-3xl justify-center items-center min-h-screen">
      <Image src="/404.png" alt="404 Page Not Found" className="w-full max-w-sm" width="300" height="300"/>
      <div className="font-bold text-4xl lg:text-6xl text-center text-primary-600 mb-5">Page Not Found</div>
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