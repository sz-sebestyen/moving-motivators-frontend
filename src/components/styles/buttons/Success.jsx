import styled from "styled-components";

const StyledSuccess = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  color: inherit;
`;

const Success = (props) => {
  return <StyledSuccess>{"✓"}</StyledSuccess>;
};

export default Success;
