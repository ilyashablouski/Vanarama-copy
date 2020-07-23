import Heading from "@vanarama/uibook/lib/components/atoms/heading";

export const prepareTagName = (possibleTag: string | null) =>
    possibleTag && Heading.defaultProps?.tag?.indexOf(possibleTag) !== -1
        ? possibleTag
        : undefined;