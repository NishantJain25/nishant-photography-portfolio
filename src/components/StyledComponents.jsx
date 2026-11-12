import { styled } from "styled-components";
export const Row = styled.div`
  display: flex;
  gap: ${({ gap }) => (gap ? `var(--spacing-${gap})` : null)};
`;

// At least one screen tall, growing when the content needs more room.
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  min-height: var(--screen-height);
  box-sizing: border-box;
  margin: 0 var(--page-gutter);
  border: 1px solid var(--color-neutral-700);
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "flex-start")};
  height: 100%;
  padding: var(--section-spacing) var(--page-gutter);
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  min-height: 0;
`;
export const SectionRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(var(--spacing-8), 5vw, var(--spacing-16));
  align-items: center;
  flex: 1;
  padding: var(--section-spacing) var(--page-gutter);
  box-sizing: border-box;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    align-content: center;
  }
`;

export const SectionTitle = styled.h2`
  font-size: var(--font-size-7xl);
  font-weight: var(--font-weight-normal);
  letter-spacing: normal;
  line-height: 1.1;
  color: white;
  margin: 0;
`;

export const PageContainer = styled.div`
  min-height: var(--screen-height);
  flex: 1;
  box-sizing: border-box;
  display: flex;
  margin: 0 var(--page-gutter);
  border: 1px solid var(--color-neutral-700);
`;

export const Circle = styled.button`
  height: 50px;
  width: 50px;
  background-color: transparent;
  border: 3px solid ${(props) => (props.light ? "white" : "black")};
  border-radius: 50%;
  color: ${(props) => (props.light ? "white" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  transition: all 0.3s ease-out;
  scale: ${(props) => props.scale};
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: clamp(var(--spacing-12), 9vw, var(--spacing-24)) 0;
  gap: clamp(var(--spacing-4), 3vw, var(--spacing-8));
  flex-wrap: wrap;
  position: relative;
`;

export const HeaderTextContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const HeaderText = styled.p`
  margin: 0;
  padding: 0;
  font-size: var(--font-size-8xl);
  text-align: left;
  color: white;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
`;

// How wide a photo displays in ImageGridWrapper, matching its column counts below.
export const IMAGE_GRID_SIZES =
  "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw";

export const ImageGridWrapper = styled.div`
  column-count: ${({ columnCount }) => columnCount ?? 3};
  column-gap: 16px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    column-count: 2;
  }

  @media (max-width: 480px) {
    column-count: 1;
  }
`;

export const StatusMessage = styled.p`
  font-size: var(--font-size-xl);
  color: var(--color-neutral-400);
  margin: 0;
`;

export const Divider = styled.div`
  background-color: var(--color-neutral-600);
  height: 1px;
  width: 100%;
`;
