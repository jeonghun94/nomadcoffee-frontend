import styled from "styled-components";
import { darkModeVar } from "./apollo";

const Container = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  width: 100%;
`;

export const Mode = () => {
  return (
    <Container>
      <Button onClick={() => darkModeVar(!darkModeVar())}>
        {darkModeVar() ? "change to light" : "change to dark"}
      </Button>
    </Container>
  );
};
