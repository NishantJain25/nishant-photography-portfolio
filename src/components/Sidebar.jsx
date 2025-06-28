import React from "react";
import { styled } from "styled-components";
import { LiaArrowRightSolid } from "react-icons/lia";
import { Circle } from "./StyledComponents";

const WebSidebarContainer = styled.div`
  width: ${(props) => (props.open ? "30vw" : "0px")};
  background-color: rgba(237, 237, 237, 1);
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease-out;
`;

const TopContainer = styled.div`
  height: auto;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
`;

const FilterItemsContainer = styled.div`
  flex: 1;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
`;

const FilterItem = styled.div`
  width: 100%;
  font-size: 36px;
`;

const FilterItemContent = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => (props.selected ? "orange" : "black")};
  transition: all 0.3s ease-out;
`;

const FilterItemCount = styled.span`
  position: absolute;
  top: 0;
  left: 100%;
  font-size: 16px;
  color: orange;
`;

const Marker = styled.div`
  height: 3px;
  width: ${(props) => (props.selected ? "36px" : "0px")};
  background-color: orange;
  transition: all 0.3s ease-out;
`;

const Sidebar = ({ open, setIsOpen, selectedFilter }) => {
  return (
    <WebSidebarContainer id="sidebar" open={open}>
      <TopContainer>
        <Circle onClick={() => setIsOpen(false)}>
          <LiaArrowRightSolid />
        </Circle>
      </TopContainer>
      <FilterItemsContainer>
        <FilterItem>
          <FilterItemContent>
            <Marker />
            <div>All</div>
            <FilterItemCount>25</FilterItemCount>
          </FilterItemContent>
        </FilterItem>
        <FilterItem>
          <FilterItemContent>
            Food <FilterItemCount>05</FilterItemCount>
          </FilterItemContent>
        </FilterItem>
        <FilterItem>
          <FilterItemContent>
            Product <FilterItemCount>05</FilterItemCount>
          </FilterItemContent>
        </FilterItem>
        <FilterItem>
          <FilterItemContent>
            Fashion <FilterItemCount>05</FilterItemCount>
          </FilterItemContent>
        </FilterItem>
        <FilterItem>
          <FilterItemContent>
            Jewellery <FilterItemCount>05</FilterItemCount>
          </FilterItemContent>
        </FilterItem>
        <FilterItem>
          <FilterItemContent>
            Parties <FilterItemCount>05</FilterItemCount>
          </FilterItemContent>
        </FilterItem>
        <FilterItem>
          <FilterItemContent>
            Misc <FilterItemCount>05</FilterItemCount>
          </FilterItemContent>
        </FilterItem>
      </FilterItemsContainer>
    </WebSidebarContainer>
  );
};

export default Sidebar;
