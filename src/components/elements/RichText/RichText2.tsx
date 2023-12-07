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
import { ContentPiece } from "../ContentPiece/ContentPiece";
import Link from "next/link";
import { PiCheckBold } from "react-icons/pi";

export default function RichText2({
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
            return <ul className="list-none !pl-0">{children}</ul>;
          },
          [BLOCKS.LIST_ITEM]: (node: Inline | Block, children: ReactNode) => {
            if (style === "marketing") {
              return (
                <li className="flex gap-2">
                  <PiCheckBold
                    className="not-prose flex-shrink-0 relative top-1.5 ml-2 text-primary-600"
                    size={20}
                  />
                  <div className="not-prose">{children}</div>
                </li>
              );
            }
            //for style "blog"
            return (
              <li className="flex gap-2">
                <div className="not-prose">{children}</div>
              </li>
            )
          },
          [BLOCKS.EMBEDDED_ASSET]: (node: Inline | Block) => {
            return (
              <MediaItem data={node.data as MediaType} videoControls={true} />
            );
          },
          [BLOCKS.EMBEDDED_ENTRY]: (node: Inline | Block) => {
            return <ContentPiece data={node.data as ContentPieceType} />;
          },
        },
      })}
    </>
  );
}
