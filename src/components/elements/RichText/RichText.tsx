import { ReactNode } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  Document,
  Block,
  Inline,
} from "@contentful/rich-text-types";
import { MediaItem } from "../MediaItem/MediaItem";
import { ContentPieceType, MediaType } from "@/helpers/types";
import { FlexibleContent } from "../FlexibleContent/FlexibleContent";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export function RichText2({
  data,
  style = "marketing",
}: {
  data: Document;
  style?: "blog" | "marketing";
}) {
  return (
    <>
      {documentToReactComponents(data, {
        renderNode: {
          [INLINES.HYPERLINK]: (node: Inline | Block, children: ReactNode) => {
            return (
              <Link
                className="text-blue-500 hover:text-blue-600 underline-offset-4 transition-colors duration-300 ease"
                target="_blank"
                href={node.data.uri}
              >
                {children}
              </Link>
            );
          },
          [BLOCKS.UL_LIST]: (node: Inline | Block, children: ReactNode) => {
            if (style === "marketing") {
              return <ul className="list-none !pl-0">{children}</ul>;
            }
            return <ul>{children}</ul>
          },
          [BLOCKS.LIST_ITEM]: (node: Inline | Block, children: ReactNode) => {
            if (style === "marketing") {
              return (
                <li className="not-prose flex gap-4 mb-2">
                  <FaCheck
                    className="flex-shrink-0 relative top-1 ml-2 text-primary-300"
                    size={20}
                  />
                  {children}
                </li>
              );
            }
            return (
              <li>
                <div className="not-prose">{children}</div>
              </li>
            )
          },
          [BLOCKS.HEADING_1]: (node: Inline | Block, children: ReactNode) => {
            return (
              <h1 className="text-current font-heading">{children}</h1>
            )
          },
          [BLOCKS.HEADING_2]: (node: Inline | Block, children: ReactNode) => {
            return (
              <h2 className="text-current font-heading">{children}</h2>
            )
          },
          [BLOCKS.HEADING_3]: (node: Inline | Block, children: ReactNode) => {
            return (
              <h3 className="text-current font-heading">{children}</h3>
            )
          },
          [BLOCKS.HEADING_4]: (node: Inline | Block, children: ReactNode) => {
            return (
              <h4 className="text-current font-heading">{children}</h4>
            )
          },
          [BLOCKS.EMBEDDED_ASSET]: (node: Inline | Block) => {
            return (
              <MediaItem data={node.data as MediaType} videoControls={true} />
            );
          },
          [BLOCKS.EMBEDDED_ENTRY]: (node: Inline | Block) => {
            return <FlexibleContent data={node.data as ContentPieceType} />;
          },
        },
      })}
    </>
  );
}
