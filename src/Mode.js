import styled from "styled-components";
import { darkModeVar } from "./apollo";

const Container = styled.div`
  margin: 10px 0px;
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  width: ${(props) => (props.half ? "50%" : "100%")};
`;

export const Mode = () => {
  return (
    <Container>
      <Button onClick={() => darkModeVar(true)} half>
        dark
      </Button>
      <Button onClick={() => darkModeVar(false)} half>
        light
      </Button>
    </Container>
  );
};
