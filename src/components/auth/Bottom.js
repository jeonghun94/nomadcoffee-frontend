import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const SBottomBox = styled(BaseBox)`
  padding: 0px;
  text-align: center;
  border: 0px;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

const Bottom = ({ text, link, linkText }) => {
  return (
    <SBottomBox>
      <span>{text}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

Bottom.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default Bottom;
