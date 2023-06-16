import * as Radix from "@radix-ui/react-primitive";

type PrimitiveSectionProps = Radix.ComponentPropsWithoutRef<typeof Primitive.section>;
type PrimitiveHeading2Props = Radix.ComponentPropsWithoutRef<typeof Primitive.h2>;

export const Root: React.ForwardRefExoticComponent<PrimitiveSectionProps & React.RefAttributes<HTMLSectionElement>>;
export const Label: React.ForwardRefExoticComponent<React.RefAttributes<HTMLParagraphElement>>
export const Title: React.ForwardRefExoticComponent<PrimitiveHeading2Props & React.RefAttributes<HTMLHeadingElement>>
export const Subtitle: React.ForwardRefExoticComponent<React.RefAttributes<HTMLParagraphElement>>