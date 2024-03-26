import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// @TODO remove Redux
import { CustomProvider } from "@/redux/CustomProvider";
import { Metadata } from "next";
import "@/app/css/globals.css";

//@TODO redundant?
export const metadata: Metadata = {
  title: "NovaJAM",
  description: "All-in-One JAMstack Web Solution",
  openGraph: {
    images: [
      {
        url: "/bluebiz_square.webp",
      },
    ],
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <CustomProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </CustomProvider>
      </body>
    </html>
  );
}
