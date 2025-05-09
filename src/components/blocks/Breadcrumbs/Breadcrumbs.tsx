import Link from 'next/link';

export const Breadcrumbs: React.FC<{
  paths: Array<{ label: string; href: string }>;
}> = ({ paths }) => {
  return (
    <nav aria-label="breadcrumbs">
      <ul className="flex gap-2">
        {paths.map((path, idx) => (
          <li key={path.label}>
            {idx > 0 && (
              <span className="mr-2 text-xs text-slate-300 dark:text-slate-100/50">
                /
              </span>
            )}
            <Link
              href={path.href}
              className="text-xs uppercase tracking-wider text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
              {path.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
