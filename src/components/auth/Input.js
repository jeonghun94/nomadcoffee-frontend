import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: #eee;
  border-radius: 4px;
  &:focus {
    border: 1px solid #ccc;
  }
`;

export default Input;
