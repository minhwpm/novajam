import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Document, Block, Inline } from "@contentful/rich-text-types";
import { MediaItem } from "../MediaItem/MediaItem";
import { ContentPieceType, MediaType } from "@/helpers/types";
import { ContentPiece } from "../ContentPiece/ContentPiece";
import Link from "next/link";
import { ReactNode } from "react";

const renderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Inline | Block, children: ReactNode) => {
      console.log("HYPERLINK", node)
      return (
        <Link className="text-blue-500 hover:text-blue-600 underline-offset-4 transition-colors duration-300 ease" target="_blank" href={node.data.uri}>
          {children}
        </Link>
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

export default function RichText2({ data }: { data: Document }) {
  return (
    <>
      {documentToReactComponents(data, renderOptions)}
    </>
  );
}