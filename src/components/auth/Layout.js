import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
`;

const Layout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
