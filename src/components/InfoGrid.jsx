import React from "react";
import { styled } from "styled-components";

const Grid = styled.dl`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  margin: 0;
  border-top: 1px solid var(--color-neutral-700);
`;

const Label = styled.dt`
  grid-column: 1 / 3;
  color: var(--color-neutral-400);
  padding: 16px 0;
  border-bottom: 1px solid var(--color-neutral-700);
`;

const Value = styled.dd`
  grid-column: 3 / 7;
  margin: 0;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-neutral-700);
`;

// Rows without a value are skipped: rows = [{ label, value }]
const InfoGrid = ({ rows }) => (
  <Grid>
    {rows
      .filter(({ value }) => value)
      .map(({ label, value }) => (
        <React.Fragment key={label}>
          <Label>{label}</Label>
          <Value>{value}</Value>
        </React.Fragment>
      ))}
  </Grid>
);

export default InfoGrid;
