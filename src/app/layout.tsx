import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/app/styles/globals.css';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="dark:bg-slate-900 dark:text-slate-100 transition-colors duration-500">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
