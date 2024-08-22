import { renderContentfulRichText } from "./renderContentfulRichText";
// Future render functions for other CMSs
// import { renderSanityRichText } from "./renderSanityRichText";
// import { renderStrapiRichText } from "./renderStrapiRichText";

export const RichTextRenderer = ({
  content,
  type = 'contentful', // Default to Contentful for now
  style = "marketing",
}: {
  content: any;
  type?: string;
  style?: "blog" | "marketing";
}) => {
  switch (type) {
    case 'contentful':
      return renderContentfulRichText(content, style);
    // case 'sanity':
    //   return renderSanityRichText(content);
    // case 'strapi':
    //   return renderStrapiRichText(content);
    default:
      console.error(`Unsupported rich text type: ${type}`);
      return <p>Unsupported rich text type</p>;
  }
};