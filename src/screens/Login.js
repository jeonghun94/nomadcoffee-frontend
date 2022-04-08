import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import { Mode } from "../Mode";

const Title = styled.div`
  color: ${(props) => props.theme.fontColor};
  text-align: center;
  font-size: 2rem;
  margin: -200px 0 20px 0;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const Button = styled.button`
  width: ${(props) => (props.half ? "50%" : "100%")};
`;

function Login() {
  return (
    <Container>
      <Title>Login</Title>
      <Button onClick={() => isLoggedInVar(true)}>Login Now!</Button>
      <Mode />
    </Container>
  );
}
export default Login;
