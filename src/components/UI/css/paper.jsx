import { css } from "styled-components";

export const paper = css`
  color: rgba(0, 0, 0, 0.87);
  background-color: #fff;
  border-radius: 4px;
  transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 1px 3px -2px rgba(0, 0, 0, 0.2),
    0px 1px 4px 0px rgba(0, 0, 0, 0.14), 0px 0px 3px 0px rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
      0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  }
`;
