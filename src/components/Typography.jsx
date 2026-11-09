import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

// Base typography component
const BaseText = styled.p`
  font-family: ${(props) =>
    props.fontFamily || theme.typography.fontFamily.body};
  font-size: ${(props) => props.size || theme.typography.fontSize.base};
  font-weight: ${(props) => props.weight || theme.typography.fontWeight.normal};
  line-height: ${(props) =>
    props.lineHeight || theme.typography.lineHeight.normal};
  letter-spacing: ${(props) =>
    props.letterSpacing || theme.typography.letterSpacing.normal};
  color: ${(props) => props.color || theme.colors.text.primary};
  margin: ${(props) => props.margin || "0"};
  text-align: ${(props) => props.align || "left"};

  ${(props) =>
    props.truncate &&
    `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

// Typography variants
export const Display = styled(BaseText).attrs({
  as: "h1",
  size: theme.typography.fontSize["10xl"],
  weight: theme.typography.fontWeight.bold,
  lineHeight: theme.typography.lineHeight.tight,
  letterSpacing: theme.typography.letterSpacing.tighter,
  // fontStretch: "ultra-expanded",
})`
  margin-bottom: ${theme.spacing[6]};
`;

export const Heading1 = styled(BaseText).attrs({
  as: "h1",
  size: theme.typography.fontSize["6xl"],
  weight: theme.typography.fontWeight.bold,
  lineHeight: theme.typography.lineHeight.tight,
  letterSpacing: theme.typography.letterSpacing.tight,
})`
  margin-bottom: ${theme.spacing[4]};
`;

export const Heading2 = styled(BaseText).attrs({
  as: "h2",
  size: theme.typography.fontSize["4xl"],
  weight: theme.typography.fontWeight.semibold,
  lineHeight: theme.typography.lineHeight.snug,
})`
  margin-bottom: ${theme.spacing[3]};
`;

export const Heading3 = styled(BaseText).attrs({
  as: "h3",
  size: theme.typography.fontSize["2xl"],
  weight: theme.typography.fontWeight.medium,
  lineHeight: theme.typography.lineHeight.snug,
})`
  margin-bottom: ${theme.spacing[2]};
`;

export const Heading4 = styled(BaseText).attrs({
  as: "h4",
  size: theme.typography.fontSize.xl,
  weight: theme.typography.fontWeight.medium,
  lineHeight: theme.typography.lineHeight.snug,
})`
  margin-bottom: ${theme.spacing[2]};
`;

export const Body = styled(BaseText).attrs({
  as: "p",
  size: theme.typography.fontSize.base,
  weight: theme.typography.fontWeight.normal,
  lineHeight: theme.typography.lineHeight.normal,
})`
  margin-bottom: ${theme.spacing[4]};
`;

export const BodyLarge = styled(BaseText).attrs({
  as: "p",
  size: theme.typography.fontSize.lg,
  weight: theme.typography.fontWeight.normal,
  lineHeight: theme.typography.lineHeight.normal,
})`
  margin-bottom: ${theme.spacing[4]};
`;

export const BodySmall = styled(BaseText).attrs({
  as: "p",
  size: theme.typography.fontSize.sm,
  weight: theme.typography.fontWeight.normal,
  lineHeight: theme.typography.lineHeight.normal,
})`
  margin-bottom: ${theme.spacing[3]};
`;

export const Caption = styled(BaseText).attrs({
  size: theme.typography.fontSize.xs,
  weight: theme.typography.fontWeight.normal,
  lineHeight: theme.typography.lineHeight.normal,
  color: theme.colors.text.tertiary,
})`
  margin-bottom: ${theme.spacing[2]};
`;

export const Label = styled(BaseText).attrs({
  size: theme.typography.fontSize.sm,
  weight: theme.typography.fontWeight.medium,
  lineHeight: theme.typography.lineHeight.normal,
  letterSpacing: theme.typography.letterSpacing.wide,
})`
  text-transform: uppercase;
  margin-bottom: ${theme.spacing[1]};
`;

export const Subtitle = styled(BaseText).attrs({
  size: theme.typography.fontSize.lg,
  weight: theme.typography.fontWeight.light,
  lineHeight: theme.typography.lineHeight.relaxed,
  color: theme.colors.text.secondary,
})`
  margin-bottom: ${theme.spacing[4]};
`;

// Utility text components
export const Text = BaseText;

// Example usage:
// <Display>NISHANT JAIN</Display>
// <Heading1>Portfolio Title</Heading1>
// <Heading2>Section Title</Heading2>
// <Body>Regular paragraph text</Body>
// <Caption>Image caption text</Caption>
// <Label>Category label</Label>
// <Text size="lg" weight="600" color="primary">Custom text</Text>
