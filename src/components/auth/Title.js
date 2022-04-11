import styled from "styled-components";

const STitle = styled.div`
  color: ${(props) => props.theme.fontColor};
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Title = ({ title, subTitle }) => {
  return (
    <STitle>
      {title}
      <br />
      {subTitle}
    </STitle>
  );
};

export default Title;
