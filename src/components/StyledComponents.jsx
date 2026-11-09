import { styled } from "styled-components";
export const Row = styled.div`
  display: flex;
  gap: ${({ gap }) => (gap ? `var(--spacing-${gap})` : null)};
`;

export const Section = styled.section`
  height: 100vh;
  box-sizing: border-box;
  margin: 0 24px;
  border: 1px solid var(--color-neutral-700);
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "flex-start")};
  height: 100%;
  padding: 48px 24px;
  box-sizing: border-box;
  flex: 1;
`;
export const SectionRowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-16);
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`;

export const SectionTitle = styled.p`
  font-size: var(--font-size-7xl);
  color: white;
  margin: 0;
  display: flex;
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  margin: 0 24px;
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
  margin: var(--spacing-24) 0;
  gap: var(--spacing-8);
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

export const ImageGridWrapper = styled.div`
  column-count: ${({ columnCount }) => columnCount ?? 3};
  column-gap: 16px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    column-count: ${({ columnCount }) => columnCount ?? 3};
  }

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
