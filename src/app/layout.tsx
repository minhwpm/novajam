import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/app/styles/globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-white">
      <body className="dark:bg-slate-800 dark:text-slate-100">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
