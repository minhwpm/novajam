import classNames from "classnames";
import Image from "next/image";
import { AlertType } from "@/helpers/types";
import { RichTextRenderer } from "@/components/elements/RichTextRenderer/RichTextRenderer";

export const Alert: React.FC<{ data: AlertType }> = ({ data }) => {
  const { icon, message, backgroundColor, darkMode } = data;
  if (message === null) {
    return null;
  }
  return (
    <section
      className={classNames(
        "p-4 lg:py-5 flex justify-center gap-4 items-center",
        { "text-white": darkMode },
        `bg-[${backgroundColor}]`
      )}
    >
      {icon && (
        <Image
          src={icon.url}
          alt={icon.title}
          width={icon.width}
          height={icon.height}
        />
      )}
      <RichTextRenderer content={message} />
    </section>
  );
};
