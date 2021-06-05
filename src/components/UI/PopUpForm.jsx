import styled from "styled-components";

const PopUpForm = styled.form`
  max-width: 300px;
  margin: 200px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 10px;
  padding: 10px;

  color: rgba(0, 0, 0, 0.87);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);

  input {
    flex-basis: 100%;
  }
`;

export default PopUpForm;
