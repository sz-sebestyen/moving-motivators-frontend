import styled from "styled-components";
import { paper } from "../css/paper";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 250px;
  gap: 25px;
  padding: 25px;
  margin: 100px auto;

  ${paper}

  button {
    display: block;
    margin: auto;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
  }
`;

export default Form;
