import classNames from "classnames";
import Image from "next/image";
import { AlertType } from "@/helpers/types";
import { MarkdownRenderer } from "@/components/elements/MarkdownRenderer/MarkdownRenderer";

export const Alert: React.FC<{ data: AlertType }> = ({ data }) => {
  const { icon, message, backgroundColor, darkMode } = data;
  return (
    <section
      className={classNames(
        "p-4 lg:py-5 flex justify-center gap-4 items-center",
        {
          "dark:bg-opacity-10": !darkMode && backgroundColor,
          "dark": darkMode
        }
      )}
      style={{ backgroundColor: backgroundColor ?? "none" }}
    >
      {icon && (
        <Image
          src={icon.url}
          alt={icon.title}
          width={icon.width}
          height={icon.height}
        />
      )}
      {message && (
        <MarkdownRenderer
          className={classNames("prose dark:text-slate-100 dark:prose-invert")}
        >
          {message}
        </MarkdownRenderer>
      )}
    </section>
  );
};
