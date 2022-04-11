import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  color: #fff;
  border: none;

  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
