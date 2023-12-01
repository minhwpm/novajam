import { ReactNode } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Document, Block, Inline } from "@contentful/rich-text-types";
import { MediaItem } from "../MediaItem/MediaItem";
import { ContentPieceType, MediaType } from "@/helpers/types";
import { ContentPiece } from "../ContentPiece/ContentPiece";
import Link from "next/link";
import { PiCheckBold } from "react-icons/pi";


const renderOptions = {
  renderNode: {
    
    [INLINES.HYPERLINK]: (node: Inline | Block, children: ReactNode) => {
      return (
        <Link className="text-blue-500 hover:text-blue-600 underline-offset-4 transition-colors duration-300 ease" target="_blank" href={node.data.uri}>
          {children}
        </Link>
      )
    },
    [BLOCKS.UL_LIST]: (node: Inline | Block, children: ReactNode) => {
      return (
        <ul className="list-none !pl-0">
          {children}
        </ul>
      )
    },
    [BLOCKS.LIST_ITEM]: (node: Inline | Block, children: ReactNode) => {
      return (
        <li className="flex gap-4 items-start !my-0">
          <div className="shrink-0">
            <PiCheckBold className="text-primary-500 relative bottom-0.5" size={20} />
          </div>
          {children}
        </li>
      )
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: Inline | Block ) => {
      return <MediaItem data={node.data as MediaType} videoControls={true} />
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: Inline | Block ) => {
      return <ContentPiece data={node.data as ContentPieceType} />
    },
  },
};

export default function RichText2({ data, style }: { data: Document, style: "blog" | "marketing" }) {
  return (
    <>
      {documentToReactComponents(data, renderOptions)}
    </>
  );
}